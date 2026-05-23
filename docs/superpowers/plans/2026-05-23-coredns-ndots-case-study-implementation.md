# CoreDNS ndots Case Study Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a portfolio blog case study titled "Taming Kubernetes' Dreaded ndots" and restore the Blog icon in the bottom dock navigation.

**Architecture:** Use the existing Astro content collection and blog routes. Add one MDX post under `src/content/blog`, restore the `Library` nav icon in `DATA.navbar`, and add a small Node validation script that checks the post metadata, required narrative sections, impact metrics, and nav entry.

**Tech Stack:** Astro 6, MDX content collections, React components, TypeScript/TSX data config, Lucide React icons, Node validation scripts.

---

## File Structure

- Create `src/content/blog/coredns-ndots-optimization.mdx`: the case-study content and frontmatter.
- Modify `src/data/resume.tsx`: import `Library` from `lucide-react` and add `{ href: "/blog", icon: Library, label: "Blog" }` to `DATA.navbar`.
- Create `scripts/check-coredns-case-study.mjs`: focused regression check for the case-study post and Blog nav entry.
- Modify `package.json`: add `test:coredns-case-study` script.
- Use existing `src/pages/blog/index.astro`, `src/pages/blog/[slug].astro`, `src/content.config.ts`, `src/mdx-components.tsx`, and `src/components/BlogList.tsx` without structural changes unless build output forces a minimal compatibility fix.

## Task 1: Add a Failing Case-Study Validation Script

**Files:**
- Create: `scripts/check-coredns-case-study.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write the failing validation script**

Create `scripts/check-coredns-case-study.mjs`:

```js
import { readFileSync } from "node:fs";
import { existsSync } from "node:fs";

const postPath = "src/content/blog/coredns-ndots-optimization.mdx";
const resumePath = "src/data/resume.tsx";

if (!existsSync(postPath)) {
  throw new Error(`Missing case study post: ${postPath}`);
}

const post = readFileSync(postPath, "utf8");
const resume = readFileSync(resumePath, "utf8");

const requiredPostSnippets = [
  'title: "Taming Kubernetes\\' Dreaded ndots"',
  'summary: "How a targeted CoreDNS optimization reduced avoidable Kubernetes DNS query volume by 75%."',
  "## The Hidden Tax",
  "## Before: Search Path Amplification",
  "## The Design",
  "## Why Not autopath?",
  "## Impact",
  "## References",
  "75%",
  "4x",
  "80%",
  "50%",
  "ndots:5",
  "mysvc.example.com.<namespace>.svc.cluster.local",
  "Learning CoreDNS",
  "John Belamaric",
  "Cricket Liu",
  "autopath",
];

for (const snippet of requiredPostSnippets) {
  if (!post.includes(snippet)) {
    throw new Error(`Missing case study content snippet: ${snippet}`);
  }
}

const forbiddenPostSnippets = [
  "ebay.com",
  "eBay internal",
  "TODO",
  "TBD",
];

for (const snippet of forbiddenPostSnippets) {
  if (post.includes(snippet)) {
    throw new Error(`Case study includes forbidden/private or placeholder snippet: ${snippet}`);
  }
}

if (!resume.includes("Library")) {
  throw new Error("Blog nav icon import must include Library");
}

if (!resume.includes('{ href: "/blog", icon: Library, label: "Blog" }')) {
  throw new Error("DATA.navbar must include the Blog dock item");
}
```

- [ ] **Step 2: Add the npm script**

In `package.json`, add this script near the other custom checks:

```json
"test:coredns-case-study": "node scripts/check-coredns-case-study.mjs"
```

- [ ] **Step 3: Run the validation and verify it fails**

Run:

```bash
npm run test:coredns-case-study
```

Expected: FAIL with `Missing case study post: src/content/blog/coredns-ndots-optimization.mdx`.

- [ ] **Step 4: Commit the failing validation**

```bash
git add scripts/check-coredns-case-study.mjs package.json
git commit -m "Add CoreDNS case study validation"
```

## Task 2: Restore Blog Dock Navigation

**Files:**
- Modify: `src/data/resume.tsx`
- Test: `scripts/check-coredns-case-study.mjs`

- [ ] **Step 1: Update the Lucide import**

Change the Lucide import in `src/data/resume.tsx` so it includes `Library`:

```ts
import {
  Binoculars,
  Camera,
  Dumbbell,
  GitBranch,
  Hand,
  House,
  Library,
  Mic,
  Play,
  Terminal,
} from "lucide-react";
```

- [ ] **Step 2: Add the Blog nav item**

Update `DATA.navbar` in `src/data/resume.tsx`:

```ts
navbar: [
  { href: "/", icon: House, label: "Home" },
  { href: "/blog", icon: Library, label: "Blog" },
],
```

- [ ] **Step 3: Run the validation and verify the remaining failure**

Run:

```bash
npm run test:coredns-case-study
```

Expected: FAIL with `Missing case study post: src/content/blog/coredns-ndots-optimization.mdx`. The nav-related failures should not appear.

- [ ] **Step 4: Commit the nav restoration**

```bash
git add src/data/resume.tsx
git commit -m "Restore Blog dock navigation"
```

## Task 3: Add the CoreDNS Case Study MDX Post

**Files:**
- Create: `src/content/blog/coredns-ndots-optimization.mdx`
- Test: `scripts/check-coredns-case-study.mjs`

- [ ] **Step 1: Create the MDX post**

Create `src/content/blog/coredns-ndots-optimization.mdx`:

````mdx
---
title: "Taming Kubernetes' Dreaded ndots"
publishedAt: "2026-05-23"
author: "Mat Lowery"
summary: "How a targeted CoreDNS optimization reduced avoidable Kubernetes DNS query volume by 75%."
---

Kubernetes DNS can hide a surprising amount of waste behind a small resolver setting. In one large private Kubernetes environment, I traced a major share of DNS traffic back to pod search-path expansion and designed a targeted CoreDNS optimization that reduced DNS query volume by 75%.

The result was not a broad rewrite of service discovery. It was a narrow fix for a specific amplification pattern: application queries that were already effectively absolute, but did not clear Kubernetes' default `ndots:5` threshold.

| Result | Impact |
| --- | --- |
| DNS query volume | 75% reduction |
| CoreDNS QPS capacity | 4x increase |
| CoreDNS CPU | 80% reduction |
| CoreDNS memory | 50% reduction |

## The Hidden Tax

For each pod, kubelet writes an `/etc/resolv.conf`. By default, Kubernetes sets `ndots:5`, which means a DNS name must contain at least five dots before the resolver tries it as written first.

Most application names do not meet that bar. A name such as `mysvc.example.com` looks complete to a human, but with `ndots:5` the resolver first appends the pod's configured search suffixes and tries several expanded names that cannot possibly exist.

That behavior is correct from the resolver's point of view. At fleet scale, though, it becomes a hidden platform tax: CoreDNS spends CPU, memory, and query capacity answering avoidable misses before the resolver finally asks for the original name.

## Before: Search Path Amplification

The problematic pattern looked like this:

```text
App asks for:
mysvc.example.com

Resolver tries:
1. mysvc.example.com.<namespace>.svc.cluster.local
2. mysvc.example.com.svc.cluster.local
3. mysvc.example.com.cluster.local
4. mysvc.example.com.<internal search suffix>
5. mysvc.example.com
```

The early attempts are noise. They combine an already meaningful external-style name with Kubernetes search-path suffixes. The resolver still has to try them, and CoreDNS still has to process them.

## The Design

The optimization was a CoreDNS plugin configured with one or more domains, such as `example.com`. For those domains, the plugin looked for expanded query names that matched known nonsense patterns.

At a high level, the decision flow was:

```text
CoreDNS receives:
mysvc.example.com.<namespace>.svc.cluster.local

Plugin checks:
- Does the query contain a configured domain such as example.com?
- Does the suffix after that domain look like Kubernetes search-path noise?
- Does the full query match one of the conservative nonsense-name patterns?

If yes:
respond as if a CNAME-style shortcut exists to mysvc.example.com
```

The key was restraint. The plugin did not try to solve every search-path problem. It only recognized names that were clear artifacts of `ndots` expansion and redirected the resolver toward the name it was going to try eventually.

## Why Not autopath?

The design was inspired by the community CoreDNS `autopath` plugin, which also addresses search-path behavior. But this use case did not need the full generality of `autopath`.

`autopath` needs pod awareness so it can derive the right search path for each query. That means watching pod state. For this optimization, the useful signal was simpler: configured domains plus conservative regular expressions that identified impossible expanded names.

Avoiding pod watches kept the design smaller and easier to reason about. It also reduced operational complexity: the plugin could remove a large amount of wasted DNS work without introducing another dependency on full pod state.

## Impact

The effect was large because the waste was repeated everywhere. Once the plugin intercepted the common nonsense expansions, CoreDNS stopped spending most of its effort on queries that existed only because of resolver search-path behavior.

The measured outcome:

- DNS query volume dropped by 75%.
- CoreDNS QPS capacity increased 4x.
- CoreDNS CPU usage dropped by 80%.
- CoreDNS memory usage dropped by 50%.

The broader lesson was that infrastructure performance work is often about finding amplification. A small default can be reasonable in isolation and still become expensive when multiplied across every pod, every process, and every lookup path.

## References

- John Belamaric and Cricket Liu, *Learning CoreDNS: Configuring DNS for Cloud Native Environments*, O'Reilly.
- CoreDNS `autopath` plugin documentation: <https://coredns.io/plugins/autopath/>
````

- [ ] **Step 2: Run the focused validation and verify it passes**

Run:

```bash
npm run test:coredns-case-study
```

Expected: PASS.

- [ ] **Step 3: Commit the case-study post**

```bash
git add src/content/blog/coredns-ndots-optimization.mdx
git commit -m "Add CoreDNS ndots case study"
```

## Task 4: Verify Blog Rendering and Build

**Files:**
- Verify: `src/pages/blog/index.astro`
- Verify: `src/pages/blog/[slug].astro`
- Verify: `src/content/blog/coredns-ndots-optimization.mdx`
- Verify: `src/data/resume.tsx`

- [ ] **Step 1: Run all focused checks**

Run:

```bash
npm run test:coredns-case-study
npm run test:projects
npm run test:work-ids
```

Expected: all three commands exit `0`.

- [ ] **Step 2: Run the production build**

Run:

```bash
npm run build
```

Expected: exit `0`. The previous `UnknownContentCollectionError` blog prerender errors should be gone once a real MDX blog post exists. If a build warning remains about an unrelated asset or environment detail, record it in the final notes.

- [ ] **Step 3: Inspect the generated route names**

Run:

```bash
find dist -maxdepth 4 -type f | sort | rg 'blog|coredns|index.html'
```

Expected output includes a generated page for the blog index and `/blog/coredns-ndots-optimization/index.html` or the equivalent Cloudflare server output path.

- [ ] **Step 4: Commit any minimal render fixes**

If Task 4 required code fixes, commit them:

```bash
git add src/pages/blog src/components/BlogList.tsx src/mdx-components.tsx src/content.config.ts
git commit -m "Fix blog case study rendering"
```

If no fixes were required, do not create an empty commit.

## Task 5: Final Review

**Files:**
- Review: `src/content/blog/coredns-ndots-optimization.mdx`
- Review: `src/data/resume.tsx`
- Review: `scripts/check-coredns-case-study.mjs`
- Review: `package.json`

- [ ] **Step 1: Check for private or placeholder content**

Run:

```bash
rg -n 'TODO|TBD|ebay\.com|eBay internal|<internal service>|<real domain>' src/content/blog/coredns-ndots-optimization.mdx scripts/check-coredns-case-study.mjs
```

Expected: no matches.

- [ ] **Step 2: Check git diff**

Run:

```bash
git status --short
git diff --stat
```

Expected: only intentional files remain changed. Pre-existing unrelated changes may still appear; do not revert them.

- [ ] **Step 3: Final response**

Report:

- The case-study route.
- The restored Blog dock nav item.
- The validation commands and build result.
- Any remaining pre-existing unrelated worktree changes or warnings.
