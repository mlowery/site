# CoreDNS ndots Case Study Design

## Goal

Create a case study titled "Taming Kubernetes' Dreaded ndots" for the portfolio blog. The page should show hiring managers that Mat can find hidden infrastructure waste, reason across Kubernetes and DNS behavior, design a targeted optimization, and produce measurable platform impact.

## Audience

Primary audience: hiring managers and recruiters.

The case study should be accessible to non-DNS specialists while still carrying enough technical detail to be credible. It should explain the problem in plain language first, then deepen into the CoreDNS design.

## Placement

Use the existing blog route machinery under `src/pages/blog`.

Restore the bottom floating nav Blog item using the original baseline pattern:

```ts
{ href: "/blog", icon: Library, label: "Blog" }
```

The first case study will live at `/blog/coredns-ndots-optimization`.

## Story Shape

Use a narrative case-study format:

1. Title: "Taming Kubernetes' Dreaded ndots"
2. Lead: Kubernetes' default pod DNS behavior was creating avoidable query amplification across a large fleet. A targeted CoreDNS optimization reduced DNS query volume by 75%.
3. The Hidden Tax: explain `ndots:5`, kubelet-created pod `/etc/resolv.conf`, and search suffix expansion.
4. Before: include a simple text diagram of a query cascade where a name like `mysvc.example.com` becomes multiple useless cluster-local lookups before the original query is tried.
5. Design: describe a CoreDNS plugin configured with one or more domains, such as `example.com`, that detects nonsense expanded names with regular expressions and returns a CNAME-style shortcut response.
6. Why Not autopath: explain that the design was inspired by CoreDNS `autopath`, but intentionally simpler. Unlike `autopath`, it did not need to watch all pods, which reduced operational complexity and watch load.
7. Impact: publish exact outcome metrics: 75% DNS query reduction, 4x QPS capacity, 80% CPU reduction, and 50% memory reduction.
8. Reference: include a small reference section attributing the "dreaded ndots" phrase to *Learning CoreDNS: Configuring DNS for Cloud Native Environments* by John Belamaric and Cricket Liu, published by O'Reilly.
9. Further Reading: link to the CoreDNS `autopath` plugin documentation as the community inspiration for the CNAME-style shortcut pattern.

## Detail Boundaries

Allowed:

- High-level Kubernetes resolver behavior.
- Example query transformations.
- Pseudo-config.
- Regex-shaped examples.
- A before/after text diagram.
- CNAME-style response explanation.
- Exact published impact metrics.

Avoid:

- Proprietary code.
- Internal domain names.
- Internal service names.
- Internal rollout details.
- Production topology details beyond what is needed to explain the impact.

## Diagram

Use a text-first diagram, not a generated visual asset.

Before example:

```text
App asks for: mysvc.example.com

Resolver tries:
1. mysvc.example.com.<namespace>.svc.cluster.local
2. mysvc.example.com.svc.cluster.local
3. mysvc.example.com.cluster.local
4. mysvc.example.com.<internal search suffix>
5. mysvc.example.com
```

After example:

```text
CoreDNS sees a nonsense expanded name:
mysvc.example.com.<namespace>.svc.cluster.local

Plugin recognizes:
- `example.com` is already a configured absolute domain
- the remaining suffix is Kubernetes search-path noise

Plugin answers with a CNAME-style shortcut to:
mysvc.example.com
```

## Tone

Clear, practical, and impact-oriented. Avoid sounding like a textbook or a confidential incident report. The page should read like a senior infrastructure engineer explaining how they found and removed a hidden platform tax.

## Design Decisions

- Use `/blog/coredns-ndots-optimization` as the slug.
- Include `autopath` as a linked further-reading reference, not as a deep technical dependency.
- Put a compact metrics summary near the top and repeat the same numbers in the Impact section where they have more context.
