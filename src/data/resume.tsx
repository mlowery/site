import { Icons } from "@/components/icons";
import { House } from "lucide-react";
import { Python } from "@/components/ui/svgs/python";
import { Golang } from "@/components/ui/svgs/golang";
import { Java } from "@/components/ui/svgs/java";
import { Docker } from "@/components/ui/svgs/docker";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";

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
    work: { order: 6, enabled: true, heading: "Work Experience", presentLabel: "Present" },
    education: { order: 9, enabled: true, heading: "Education" },
    skills: { order: 4, enabled: true, heading: "Skills" },
    projects: {
      order: 7,
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
    contact: {
      order: 12,
      enabled: true,
      label: "Contact",
      heading: "Get in Touch",
      text: "If my background looks relevant to what you're building, email is the best way to reach me.",
    },
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
        "Operators",
        "Federation",
        "Container registries",
      ],
    },
    {
      name: "Infrastructure and delivery",
      skills: [
        "GitOps",
        "Automation",
        "CI/CD",
        "Observability",
        "Cloud infrastructure",
        "Bare metal",
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
        "Technical mentoring",
        "Remote written collaboration",
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
    },
    {
      name: "OpenDev reviews",
      url: "https://review.opendev.org/q/owner:mlowery@ebaysf.com",
      description: "OpenStack-era code reviews and project contributions.",
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
  praise: [],
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
      logoUrl: "https://www.google.com/s2/favicons?domain=hitachivantara.com&sz=128",
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
