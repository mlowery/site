import { Icons } from "@/components/icons";
import { Binoculars, File, House, Mic, Play } from "lucide-react";
import { Python } from "@/components/ui/svgs/python";
import { Golang } from "@/components/ui/svgs/golang";
import { Java } from "@/components/ui/svgs/java";
import { Docker } from "@/components/ui/svgs/docker";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";

function GlueIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 2h6v5H9z" />
      <path d="M10 7h4l2 4v9a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-9z" />
      <path d="M8 14h8" />
      <path d="M10 18h4" />
    </svg>
  );
}

export const DATA = {
  name: "Mat Lowery",
  initials: "ML",
  url: "https://matlowery.com",
  location: "Denver Metropolitan Area",
  locationLink: "https://www.google.com/maps/place/Denver,+CO",
  description:
    "I build internal platforms, automation, and developer tools that make complex infrastructure easier to use.",
  summary:
    "I'm a senior backend and platform engineer interested in developer productivity, internal tools, and infrastructure that gets out of the way. Over the past decade, I've worked deeply within the Kubernetes ecosystem, including container registries, K8s apiserver, etcd, operators, and CoreDNS at large scale. The thread through my work is making complex systems easier for engineers to understand and use: automating repeatable work, improving observability, documenting operational paths, reducing cognitive load, and building safer workflows around infrastructure change.",
  avatarUrl: "/headshot.png",
  ogImage: "/og_image.png",
  sections: {
    about: { order: 1, enabled: true, heading: "About" },
    impact: { order: 3, enabled: true, heading: "Impact" },
    openSource: { order: 5, enabled: true, heading: "Open Source Contributions" },
    work: { order: 6, enabled: true, heading: "Work Experience", presentLabel: "Present" },
    education: { order: 9, enabled: true, heading: "Education" },
    skills: { order: 4, enabled: true, heading: "Skills" },
    projects: {
      order: 10.5,
      enabled: true,
      label: "Personal Projects",
      heading: "Personal Projects",
      text: "Small tools and experiments that reflect how I work: practical automation, Kubernetes workflows, and durable developer environments.",
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
    speaking: { order: 8, enabled: true, heading: "Speaking" },
    contact: {
      order: 11,
      enabled: true,
      label: "Contact",
      heading: "Get in Touch",
      text: "If my background looks relevant to what you're building, email is the best way to reach me.",
    },
    praise: { order: 10, enabled: true, heading: "Praise" },
  },
  photos: [],
  skills: [
    { name: "Go", icon: Golang },
    { name: "Python", icon: Python },
    { name: "Java", icon: Java },
    { name: "Kubernetes", icon: Kubernetes },
    { name: "Docker", icon: Docker },
  ],
  skillGroups: [
    { name: "Languages", skills: ["Go", "Python", "Ruby", "Java", "Shell"] },
    {
      name: "Platform and Kubernetes",
      skills: [
        "Kubernetes",
        "etcd",
        "APIServer",
        "CoreDNS",
        "DNS",
        "Operators",
        "Federation",
        "Container registries",
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
        "Disaster recovery testing",
      ],
    },
    {
      name: "Databases",
      skills: ["MySQL", "MongoDB", "Couchbase", "Cassandra", "Redis", "OpenStack Trove"],
    },
    {
      name: "Tools and practices",
      skills: [
        "Testing",
        "Runbooks",
        "Documentation",
        "Jira",
        "Confluence",
        "Mentoring",
        "Technical Writing",
      ],
    },
    {
      name: "AI-assisted engineering",
      skills: ["ChatGPT", "Gemini", "Claude"],
    },
  ],
  impact: [
    {
      label: "Annual vendor cost eliminated",
      value: "$200K+",
      description: "Led registry migration from proprietary to open-source infrastructure.",
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
  ],
  openSource: [
    {
      name: "GitHub contributions",
      url: "https://github.com/search?q=author%3Amlowery",
      description: "Public contributions across infrastructure and backend ecosystems.",
      highlights: [
        {
          project: "CoreDNS",
          title: "CoreDNS Kubernetes plugin namespace performance",
          url: "https://github.com/coredns/coredns/pull/4767",
          detail:
            "Merged a Kubernetes plugin change that replaced namespace list scans with cache lookups and reduced namespace cache memory for clusters with 10K+ namespaces.",
        },
        {
          project: "CoreDNS",
          title: "CoreDNS Prometheus metric docs",
          url: "https://github.com/coredns/coredns/pull/3029",
          detail:
            "Fixed incorrect `response_rcode_count_total` metric references in forward and gRPC plugin documentation.",
        },
        {
          project: "Kubernetes Cluster Registry",
          title: "Cluster registry API server RBAC fix",
          url: "https://github.com/kubernetes-retired/cluster-registry/pull/204",
          detail:
            "Corrected ClusterRole resources for the cluster registry API server so the generated access rules matched the API resource names.",
        },
        {
          project: "Quay",
          title: "RadosGW storage provider chunk sizing",
          url: "https://github.com/quay/quay/pull/3958",
          detail:
            "Opened a Quay storage provider change adding `minimum_chunk_size_mb` configurability for RadosGW uploads.",
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
          title: "OpenStack Trove cluster task manager",
          url: "https://review.opendev.org/c/openstack/trove/+/113692",
          detail:
            "Merged the cluster task manager implementation for OpenStack Trove, adding the orchestration layer for database cluster lifecycle work.",
        },
        {
          project: "OpenStack Trove Integration",
          title: "Trove restart workflow reliability",
          url: "https://review.opendev.org/c/openstack/trove-integration/+/123582",
          detail:
            "Improved Trove integration tooling by reusing the existing screen window when restarting Trove services during development and testing.",
        },
        {
          project: "OpenStack Trove Integration",
          title: "Conditional config loading",
          url: "https://review.opendev.org/c/openstack/trove-integration/+/119880",
          detail:
            "Merged a Trove integration change to load configuration parameters conditionally, reducing friction in local and gate workflows.",
        },
        {
          project: "OpenDev System Config",
          title: "Developer documentation CSS fix",
          url: "https://review.opendev.org/c/opendev/system-config/+/71752",
          detail:
            "Fixed list-item styling in OpenDev system documentation while preserving the Jenkins-specific CSS exception.",
        },
      ],
    },
  ],
  speaking: [
    {
      event: "SpringOne Americas",
      topic: "Spring Security usage in Pentaho product architecture",
    },
    {
      event: "OpenStack Trove Day",
      topic: "OpenStack Trove and database-as-a-service work",
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
  navbar: [
    { href: "/", icon: House, label: "Home" },
  ],
  contact: {
    email: "mat@matlowery.com",
    tel: "",
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
      company: "eBay",
      href: "https://www.ebay.com",
      badges: [],
      location: "Remote",
      title: "Sr. MTS, Software Engineer",
      logoUrl: "https://www.google.com/s2/favicons?domain=ebay.com&sz=128",
      start: "February 2022",
      end: undefined,
      description:
        "Senior backend infrastructure engineer focused on Kubernetes control planes, etcd, DNS, federation, container registry, SRE enablement, and platform automation for one of the industry's largest private Kubernetes fleets. Led a registry migration that eliminated six figures per year in vendor cost, improved APIServer reliability with SRE partners, rolled out operator-based automation across 100 etcd clusters, split federation syncing for multi-year scale runway, and adopted AI-assisted, spec-driven workflows while preserving reviewability.",
    },
    {
      company: "eBay",
      href: "https://www.ebay.com",
      badges: [],
      location: "Austin, TX",
      title: "MTS 2, Software Engineer",
      logoUrl: "https://www.google.com/s2/favicons?domain=ebay.com&sz=128",
      start: "May 2016",
      end: "February 2022",
      description:
        "Built and operated eBay's Kubernetes platform across DNS, federation, control planes, release automation, security hardening, and production support at 60+ clusters, 30K+ nodes, and 160K+ pods. Tuned CoreDNS to reduce query volume 75%, increase QPS 4x, and cut CPU and memory by 80% and 50%. Built GitOps-based federation release automation, credential rotation automation, and clear written practices for remote infrastructure work.",
    },
    {
      company: "eBay",
      href: "https://www.ebay.com",
      badges: [],
      location: "Austin, TX",
      title: "MTS 2, Software Engineer",
      logoUrl: "https://www.google.com/s2/favicons?domain=ebay.com&sz=128",
      start: "November 2013",
      end: "April 2016",
      description:
        "Developed database-as-a-service and database failover tooling for eBay infrastructure, with emphasis on testability, operational hardening, and OpenStack-based services. Contributed code, reviews, bugs, documentation, and infrastructure debugging across OpenStack Trove and related OpenStack projects.",
    },
    {
      company: "X.commerce",
      href: "https://www.ebayinc.com",
      badges: [],
      location: "Austin, TX",
      title: "MTS 1, Software Engineer",
      logoUrl: "https://www.google.com/s2/favicons?domain=ebayinc.com&sz=128",
      start: "April 2012",
      end: "November 2013",
      description:
        "Built and operated private OpenStack infrastructure on bare metal, including Nova, Keystone, Glance, Swift, and Cinder. Led replacement of floating-IP failover with Corosync and Pacemaker clustering for more robust VM high availability.",
    },
    {
      company: "Pentaho",
      href: "https://www.hitachivantara.com",
      badges: [],
      location: "Orlando, FL",
      title: "Senior Software Engineer",
      logoUrl: "/logos/pentaho.svg",
      start: "October 2006",
      end: "April 2012",
      description:
        "Built core backend platform features for business intelligence products, including secured artifact repository architecture, security infrastructure, and open-source integrations. Led product security components, wrote public documentation used by customer-facing teams, contributed to Spring Security, Apache Jackrabbit, CloudInit, and presented at SpringOne Americas.",
    },
    {
      company: "Wyndham Worldwide",
      href: "https://www.travelandleisureco.com",
      badges: [],
      location: "Orlando, FL",
      title: "Application Software Developer",
      logoUrl: "https://www.google.com/s2/favicons?domain=travelandleisureco.com&sz=128",
      start: "October 2003",
      end: "September 2006",
      description:
        "Built enterprise web application infrastructure for customer-facing systems, with focus on security, shared services, reusable application layers, and user-management services across Active Directory and Oracle user stores.",
    },
  ],
  education: [
    {
      school: "University of Central Florida",
      href: "https://www.ucf.edu",
      degree: "Master's Degree, Computer Science",
      logoUrl: "https://www.google.com/s2/favicons?domain=ucf.edu&sz=128",
      start: "",
      end: "",
    },
    {
      school: "University of Central Florida",
      href: "https://www.ucf.edu",
      degree: "Bachelor's Degree, Computer Science",
      logoUrl: "https://www.google.com/s2/favicons?domain=ucf.edu&sz=128",
      start: "",
      end: "",
    },
  ],
  projects: [
    {
      title: "Emcee",
      href: "https://github.com/mlowery/emcee",
      dates: "",
      active: true,
      description: "Personal project for practical automation; description will be tightened after inspecting the repository.",
      technologies: ["Go"],
      icon: <Mic className="size-5" />,
      iconTone: "bg-sky-500/10 text-sky-600 dark:text-sky-300",
      links: [
        {
          type: "Source",
          href: "https://github.com/mlowery/emcee",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "sticky-kubeconfig",
      href: "https://github.com/mlowery/sticky-kubeconfig",
      dates: "",
      active: true,
      description: "Kubernetes workflow helper; description will be tightened after inspecting the repository.",
      technologies: ["Kubernetes", "Shell"],
      icon: <GlueIcon className="size-5" />,
      iconTone: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
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
      description: "Container image tooling project; description will be tightened after inspecting the repository.",
      technologies: ["Containers", "OCI"],
      icon: <Play className="size-5" />,
      iconTone: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
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
    {
      title: "dotfiles",
      href: "https://github.com/mlowery/dotfiles",
      dates: "",
      active: true,
      description: "Personal development environment configuration.",
      technologies: ["Shell", "Git"],
      icon: <File className="size-5" />,
      iconTone: "bg-violet-500/10 text-violet-600 dark:text-violet-300",
      links: [
        {
          type: "Source",
          href: "https://github.com/mlowery/dotfiles",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "kubectl-watchhook",
      href: "https://github.com/mlowery/kubectl-watchhook",
      dates: "",
      active: true,
      description: "kubectl workflow helper; description will be tightened after inspecting the repository.",
      technologies: ["Kubernetes", "kubectl"],
      icon: <Binoculars className="size-5" />,
      iconTone: "bg-rose-500/10 text-rose-600 dark:text-rose-300",
      links: [
        {
          type: "Source",
          href: "https://github.com/mlowery/kubectl-watchhook",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
  ],
  hackathons: [],
} as const;
