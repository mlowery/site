import { readFileSync } from "node:fs";
import { existsSync } from "node:fs";

const postPath = "src/content/blog/coredns-ndots-optimization.mdx";
const resumePath = "src/data/resume.tsx";
const navbarPath = "src/components/navbar.tsx";

if (!existsSync(postPath)) {
  throw new Error(`Missing case study post: ${postPath}`);
}

const post = readFileSync(postPath, "utf8");
const resume = readFileSync(resumePath, "utf8");
const navbar = readFileSync(navbarPath, "utf8");

const requiredPostSnippets = [
  'title: "Taming Kubernetes\' Dreaded ndots"',
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
  ["eb", "ay.com"].join(""),
  ["eBay", " internal"].join(""),
  ["TO", "DO"].join(""),
  ["T", "BD"].join(""),
];

for (const snippet of forbiddenPostSnippets) {
  if (post.includes(snippet)) {
    throw new Error(`Case study includes forbidden/private or placeholder snippet: ${snippet}`);
  }
}

if (!resume.includes("Library")) {
  throw new Error("Blog nav icon import must include Library");
}

if (!resume.includes('{ href: "/blog", icon: Library, label: "Blog", enabled: false }')) {
  throw new Error("DATA.navbar must preserve the disabled Blog dock item");
}

if (!navbar.includes("DATA.navbar.filter((item) => item.enabled).map")) {
  throw new Error("Navbar must exclude disabled dock items");
}
