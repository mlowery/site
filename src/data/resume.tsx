import { Icons } from "@/components/icons";
import {
  House,
  Library,
  Play,
  Terminal,
} from "lucide-react";
import { Python } from "@/components/ui/svgs/python";
import { Golang } from "@/components/ui/svgs/golang";
import { Docker } from "@/components/ui/svgs/docker";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";

export const DATA = {
  name: "Mat Lowery",
  initials: "ML",
  title: "Senior Platform Engineer | Kubernetes, Cloud Infrastructure, Developer Productivity",
  url: "https://matlowery.com",
  location: "Denver Metropolitan Area",
  locationLink: "https://www.google.com/maps/place/Denver,+CO",
  description: "",
  summary:
    "I build internal platforms and infrastructure for engineers who have better things to worry about. A decade at eBay's scale — Kubernetes control planes, etcd, DNS, container registries, federation — taught me that the gap between 'it works' and 'it's easy to operate' is where most of the real work lives.",
  avatarUrl: "/headshot.png",
  ogImage: "/og_image.png",
  sections: {
    about: { order: 1, enabled: true, heading: "About" },
    impact: { order: 3, enabled: true, heading: "Impact" },
    openSource: { order: 10.3, enabled: true, heading: "Open Source Contributions" },
    work: { order: 6, enabled: true, heading: "Work Experience", presentLabel: "Present" },
    education: { order: 9, enabled: true, heading: "Education" },
    skills: { order: 4, enabled: true, heading: "Skills" },
    projects: {
      order: 10.5,
      enabled: true,
      label: "Personal Projects",
      heading: "Personal Projects",
      text: "",
    },
    hackathons: {
      order: 10,
      enabled: false,
      label: "Hackathons",
      heading: "Hackathons",
      text: "",
    },
    photos: {
      order: 11,
      enabled: false,
      heading: "Photos",
    },
    speaking: { order: 9.5, enabled: false, heading: "Speaking" },
    contact: {
      order: 11,
      enabled: true,
      label: "Contact",
      heading: "Get in Touch",
      text: "LinkedIn is the best place to reach me.",
    },
    praise: { order: 10, enabled: true, heading: "Kudos" },
  },
  photos: [],
  skills: [
    { name: "Go", icon: Golang },
    { name: "Python", icon: Python },
    { name: "Kubernetes", icon: Kubernetes },
    { name: "Docker", icon: Docker },
  ],
  skillGroups: [
    { name: "Languages", skills: ["Go", "Python", "Shell"] },
    {
      name: "Platform and Kubernetes",
      skills: [
        "Docker",
        "Kubernetes",
        "APIServer",
        "CoreDNS",
        "DNS",
        "OpenStack",
        "Operators",
        "Federation",
        "OCI container registries",
        "Quay",
        "API Priority & Fairness",
        "etcd",
      ],
    },
    {
      name: "Infrastructure and delivery",
      skills: [
        "GitOps",
        "Prometheus",
        "Grafana",
        "Tekton",
        "Linux",
        "Release automation",
        "Disaster recovery",
      ],
    },
    {
      name: "Tools",
      skills: ["Jira", "Confluence", "PagerDuty"],
    },
    {
      name: "Practices",
      skills: [
        "Mentoring",
        "Technical writing",
      ],
    },
  ],
  impact: [
    {
      label: "Annual vendor cost eliminated",
      value: "$200K+",
      description: "Led container registry migration from proprietary to open-source infrastructure.",
    },
    {
      label: "DNS query volume reduction",
      value: "75%",
      description: "Tuned CoreDNS behavior and contributed upstream improvements.",
    },
    {
      label: "Pager volume reduction",
      value: "50%",
      description: "Prioritized SLO signals and follow-up fixes with the APIServer SRE team.",
    },
    {
      label: "Container image upload rate",
      value: "2x+",
      description: "Patched container registry upload code and tuned chunk size for faster pushes.",
    },
  ],
  openSource: [
    {
      name: "GitHub contributions",
      url: "https://github.com/search?q=author%3Amlowery",
      description: "Public contributions across infrastructure and backend ecosystems.",
      highlights: [
        {
          project: "CoreDNS",
          icon: "coredns",
          title: "CoreDNS Kubernetes plugin namespace performance",
          url: "https://github.com/coredns/coredns/pull/4767",
          detail:
            "Merged a Kubernetes plugin change that replaced namespace list scans with cache lookups and reduced namespace cache memory for clusters with 10K+ namespaces.",
        },
        {
          project: "Gophercloud",
          icon: "gophercloud",
          title: "Gophercloud reauth deadlock analysis",
          url: "https://github.com/gophercloud/gophercloud/issues/645",
          detail:
            "Reported and isolated a reauthentication deadlock with a minimal reproducer and lock-level diagnosis.",
        },
        {
          project: "Quay",
          icon: "quay",
          title: "RadosGW storage provider chunk sizing",
          url: "https://github.com/quay/quay/pull/3958",
          detail:
            "Opened a Quay storage provider change adding `minimum_chunk_size_mb` configurability for RadosGW uploads.",
        },
        {
          project: "Kubernetes",
          icon: "kubernetes",
          title: "Kubelet pod status reason/message bug",
          url: "https://github.com/kubernetes/kubernetes/issues/119956",
          detail:
            "Filed a SIG Node bug showing how kubelet could copy `status.reason` and `status.message` across pod phase transitions.",
        },
      ],
    },
    {
      name: "OpenDev reviews",
      url: "https://review.opendev.org/q/owner:mlowery@ebaysf.com",
      description: "OpenStack-era code reviews and project contributions.",
      highlights: [
        {
          project: "OpenStack Trove",
          icon: "trove",
          title: "OpenStack Trove cluster task manager",
          url: "https://review.opendev.org/c/openstack/trove/+/113692",
          detail:
            "Merged the cluster task manager implementation for OpenStack Trove, adding the orchestration layer for database cluster lifecycle work.",
        },
        {
          project: "OpenStack Trove",
          icon: "trove",
          title: "Service endpoints from catalog",
          url: "https://review.opendev.org/c/openstack/trove/+/68015",
          detail:
            "Merged a Trove service-catalog change that moved service endpoint discovery away from hard-coded URL configuration.",
        },
      ],
    },
  ],
  praise: [
    {
      quote:
        "You consistently push for decisions that set us up not just for today, but for years ahead.",
      context: "Colleague feedback on long-term technical judgment",
    },
    {
      quote:
        "You have communicated super clearly and set proper and reasonable expectations for your teammates.",
      context: "Colleague feedback on ambiguous infrastructure work",
    },
    {
      quote:
        "In addition to solving our problems you always take the time to help me figure out how to solve the problem myself the next time.",
      context: "Colleague feedback on mentorship and cross-team support",
    },
  ],
  speaking: [],
  navbar: [
    { href: "/", icon: House, label: "Home", enabled: true },
    { href: "/blog", icon: Library, label: "Blog", enabled: false },
  ],
  contact: {
    email: "mat@matlowery.com",
    tel: "407-484-1603",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/mlowery",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/matlowery",
        icon: Icons.linkedin,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:mat@matlowery.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },
  work: [
    {
      id: "ebay-sr-mts-2022",
      company: "eBay",
      href: "https://www.ebay.com",
      badges: [],
      location: "Remote",
      title: "Senior MTS, Software Engineer (Senior Staff)",
      logoUrl: "/logos/ebay.svg",
      start: "Feb 2022",
      end: "Apr 2026",
      bullets: [
        "Owned and operated Kubernetes control planes, etcd, DNS, federation, container registry, and platform automation at one of the industry's largest private Kubernetes fleets",
        "Led a container registry migration that eliminated six figures per year in vendor cost",
        "Patched container registry upload code and tuned chunk size for 2x+ faster pushes",
        "Improved APIServer reliability with SRE partners, reducing pager volume 50%",
        "Rolled out operator-based automation across 100 etcd clusters",
        "Sharded federation syncing for multi-year scale runway",
      ],
    },
    {
      id: "ebay-mts2-kubernetes-2016",
      company: "eBay",
      href: "https://www.ebay.com",
      badges: [],
      location: "Austin, TX",
      title: "MTS 2, Software Engineer (Staff)",
      logoUrl: "/logos/ebay.svg",
      start: "May 2016",
      end: "Feb 2022",
      bullets: [
        "Built and operated eBay's Kubernetes platform including the control planes themselves on eBay compute and additionally cluster DNS, cluster federation, release automation, security hardening, and production support at 60+ clusters, 30K+ nodes, and 160K+ pods",
        "Tuned CoreDNS to reduce query volume 75%, increase QPS 4x, and cut CPU and memory by 80% and 50%",
        "Built GitOps-based federation release and credential rotation automation",
      ],
    },
    {
      id: "ebay-mts2-database-2013",
      company: "eBay",
      href: "https://www.ebay.com",
      badges: [],
      location: "Austin, TX",
      title: "MTS 2, Software Engineer (Staff)",
      logoUrl: "/logos/ebay.svg",
      start: "Nov 2013",
      end: "Apr 2016",
      bullets: [
        "Developed database-as-a-service for MySQL, MongoDB, Couchbase, and Cassandra on eBay infrastructure",
        "Hardened database failover tooling by raising test coverage from 0% to 75% with minimal core-code changes",
        "Contributed code, reviews, bugs, documentation, and infrastructure debugging across OpenStack Trove and related OpenStack community projects",
      ],
    },
    {
      id: "xcommerce-mts1-2012",
      company: "X.commerce",
      href: "https://www.ebayinc.com",
      badges: [],
      location: "Austin, TX",
      title: "MTS 1, Software Engineer (Senior)",
      logoUrl: "/logos/xcommerce.jpg",
      start: "Apr 2012",
      end: "Nov 2013",
      bullets: [
        "Built and operated private OpenStack infrastructure on bare metal, including Nova, Keystone, Glance, Swift, and Cinder",
        "Led replacement of floating-IP failover with Corosync and Pacemaker clustering for more robust VM high availability",
      ],
    },
    {
      id: "pentaho-senior-software-engineer-2006",
      company: "Pentaho",
      href: "https://www.hitachivantara.com",
      badges: [],
      location: "Orlando, FL",
      title: "Senior Software Engineer",
      logoUrl: "/logos/pentaho.svg",
      start: "Oct 2006",
      end: "Apr 2012",
      bullets: [
        "Built core backend platform features for business intelligence products, including secured artifact repository architecture, security infrastructure, and open-source integrations",
        "Led product security components and wrote public documentation used by customer-facing teams",
        "Contributed to Spring Security, Apache Jackrabbit, and CloudInit",
      ],
    },
    {
      id: "wyndham-application-software-developer-2003",
      company: "Wyndham Worldwide",
      href: "https://www.travelandleisureco.com",
      badges: [],
      location: "Orlando, FL",
      title: "Application Software Developer",
      logoUrl: "/logos/wyndham.svg",
      start: "Oct 2003",
      end: "Sep 2006",
      bullets: [
        "Built enterprise web application infrastructure for customer-facing systems, with focus on security, shared services, reusable application layers, and user-management services across Active Directory and Oracle user stores",
      ],
    },
  ],
  education: [
    {
      school: "University of Central Florida",
      href: "https://www.ucf.edu",
      degree: "Master's Degree, Computer Science",
      logoUrl: "/logos/ucf.png",
      start: "2001",
      end: "2003",
    },
    {
      school: "University of Central Florida",
      href: "https://www.ucf.edu",
      degree: "Bachelor's Degree, Computer Science",
      logoUrl: "/logos/ucf.png",
      start: "1998",
      end: "2001",
    },
  ],
  projects: [
    {
      title: "sticky-kubeconfig",
      href: "https://github.com/mlowery/sticky-kubeconfig",
      dates: "",
      active: true,
      description: "Shell helper for keeping a unique kubeconfig per terminal session.",
      technologies: ["Kubernetes", "Shell"],
      icon: <Terminal size={16} />,
      links: [
        {
          type: "Source",
          href: "https://github.com/mlowery/sticky-kubeconfig",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "executable-image",
      href: "https://github.com/mlowery/executable-image",
      dates: "",
      active: true,
      description: "Shell tooling to run Docker images as executables.",
      technologies: ["Containers", "OCI"],
      icon: <Play size={16} />,
      links: [
        {
          type: "Source",
          href: "https://github.com/mlowery/executable-image",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
  ],
  hackathons: [],
} as const;
