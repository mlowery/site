"""
Applies an angular, spiky orange contour that follows the subject's silhouette.
The contour only appears on the top and sides — the bottom edge is left natural.
"""
import io
import math
import random
import numpy as np
from pathlib import Path
from PIL import Image, ImageDraw
from rembg import remove
from skimage import measure, morphology
from skimage.measure import approximate_polygon

INPUT   = Path("/tmp/mat3.png")
OUTPUT  = Path("/Users/mat/src/site/public/headshot.png")
PREVIEW = Path("/tmp/headshot_preview.png")

random.seed(13)

# ── 1. Remove background ────────────────────────────────────────────────────
print("Removing background…")
with open(INPUT, "rb") as f:
    subject_bytes = remove(f.read())

subject_raw = Image.open(io.BytesIO(subject_bytes)).convert("RGBA")

# Pad so spikes have room on every side
PAD = 80
W_raw, H_raw = subject_raw.size
W, H = W_raw + 2 * PAD, H_raw + 2 * PAD
subject = Image.new("RGBA", (W, H), (0, 0, 0, 0))
subject.paste(subject_raw, (PAD, PAD))
print(f"Padded size: {W}x{H}")

# ── 2. Binary mask ───────────────────────────────────────────────────────────
alpha_arr = np.array(subject.split()[3])
mask = alpha_arr > 60

from scipy.ndimage import binary_fill_holes
mask = binary_fill_holes(mask)

# Bottom row of the subject (used later to clip orange off the bottom)
subj_rows = np.any(mask, axis=1)
subj_bottom_y = int(np.where(subj_rows)[0][-1])

# ── 3. Dilate to set contour band thickness ──────────────────────────────────
DILATION_PX = 30
struct  = morphology.disk(DILATION_PX)
dilated = morphology.binary_dilation(mask, struct)

# ── 4. Trace outer contour & simplify to angular base polygon ────────────────
contours  = measure.find_contours(dilated.astype(float), 0.5)
contour   = max(contours, key=len)
simplified = approximate_polygon(contour, tolerance=9)
base_pts  = [(float(c), float(r)) for r, c in simplified]   # (x, y)
print(f"Base polygon vertices: {len(base_pts)}")

# Centroid for outward direction
cx = np.mean([p[0] for p in base_pts])
cy = np.mean([p[1] for p in base_pts])

# ── 5. Insert an outward spike between every consecutive pair of vertices ─────
SPIKE_MIN, SPIKE_MAX = 22, 52   # px extension beyond the dilated silhouette

spiky_pts = []
n = len(base_pts) - 1           # polygon is closed; last pt == first pt

for i in range(n):
    p1 = base_pts[i]
    p2 = base_pts[(i + 1) % n]
    spiky_pts.append(p1)

    mx = (p1[0] + p2[0]) / 2
    my = (p1[1] + p2[1]) / 2
    dx, dy = mx - cx, my - cy
    dist = math.hypot(dx, dy)
    if dist > 0:
        ext = random.uniform(SPIKE_MIN, SPIKE_MAX)
        spiky_pts.append((mx + dx / dist * ext, my + dy / dist * ext))

spiky_pts.append(spiky_pts[0])  # close
print(f"Spiky polygon vertices: {len(spiky_pts)}")

# ── 6. Draw faceted shape (triangle fan from centroid) ───────────────────────
PALETTE = [
    (238, 100, 12),   # vivid orange
    (250, 120, 22),   # lighter orange
    (218,  72, 10),   # mid orange
    (198,  52, 14),   # orange-red
    (175,  38, 18),   # deep red-orange
    (212,  62, 10),   # warm orange
    (255, 125, 28),   # bright highlight
    (188,  48, 20),   # coral-red
    (228,  88, 14),   # base orange
]

shape_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
draw = ImageDraw.Draw(shape_layer)

for i in range(len(spiky_pts) - 1):
    p1 = spiky_pts[i]
    p2 = spiky_pts[i + 1]
    r, g, b = random.choice(PALETTE)
    r = max(150, min(255, r + random.randint(-20, 18)))
    g = max(15,  min(145, g + random.randint(-18, 14)))
    b = max(5,   min(42,  b + random.randint(-5,   7)))
    draw.polygon([(cx, cy), p1, p2], fill=(r, g, b, 255))

# ── 7. Erase orange below the subject's natural bottom edge ──────────────────
shape_arr = np.array(shape_layer)
shape_arr[subj_bottom_y:, :, 3] = 0
shape_layer = Image.fromarray(shape_arr)

# ── 8. Composite: white → orange shape → subject ─────────────────────────────
canvas = Image.new("RGBA", (W, H), (255, 255, 255, 255))
canvas = Image.alpha_composite(canvas, shape_layer)
canvas = Image.alpha_composite(canvas, subject)

# ── 9. Crop centered on the subject's horizontal midpoint ────────────────────
rgb     = canvas.convert("RGB")
rgb_arr = np.array(rgb)
not_white = ~(
    (rgb_arr[:, :, 0] > 250) &
    (rgb_arr[:, :, 1] > 250) &
    (rgb_arr[:, :, 2] > 250)
)
rows = np.any(not_white, axis=1)
cols = np.any(not_white, axis=0)
rmin, rmax = np.where(rows)[0][[0, -1]]
cmin, cmax = np.where(cols)[0][[0, -1]]

# Use the subject's bbox center (not the orange bbox) for horizontal centering
subj_cols = np.any(mask, axis=0)
subj_cmin, subj_cmax = np.where(subj_cols)[0][[0, -1]]
subj_cx = (subj_cmin + subj_cmax) // 2

# Symmetric horizontal half-width based on the wider side
SHIFT_LEFT = -60
half_w = max(subj_cx - cmin, cmax - subj_cx) + 25
crop_l = max(0, subj_cx - half_w - SHIFT_LEFT)
crop_r = min(W, subj_cx + half_w - SHIFT_LEFT)

M = 25
SHIFT_DOWN = 60
result = rgb.crop((crop_l, max(0, rmin - M - SHIFT_DOWN), crop_r, min(H, rmax + M + 1 - SHIFT_DOWN)))
result.save(OUTPUT,  "PNG", optimize=True)
result.save(PREVIEW, "PNG")
print(f"Saved → {OUTPUT}  ({result.size[0]}x{result.size[1]})")
