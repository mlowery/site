import { readFileSync } from "node:fs";

const resumeSource = readFileSync("src/data/resume.tsx", "utf8");

const expectedProjects = [
  {
    title: "emcee",
    href: "https://github.com/mlowery/emcee",
    icon: "Mic",
    description:
      "Multi-cluster command runner for running commands in parallel across Kubernetes clusters.",
  },
  {
    title: "sticky-kubeconfig",
    href: "https://github.com/mlowery/sticky-kubeconfig",
    icon: "Terminal",
    description: "Shell helper for keeping a unique kubeconfig per terminal session.",
  },
  {
    title: "executable-image",
    href: "https://github.com/mlowery/executable-image",
    icon: "Play",
    description: "Shell tooling to run Docker images as executables.",
  },
  {
    title: "kubectl-watchhook",
    href: "https://github.com/mlowery/kubectl-watchhook",
    icon: "Binoculars",
    description: "kubectl plugin to watch Kubernetes objects and call a command per watch event.",
  },
];

for (const project of expectedProjects) {
  if (!resumeSource.includes(`title: "${project.title}"`)) {
    throw new Error(`Missing project title: ${project.title}`);
  }

  if (!resumeSource.includes(`href: "${project.href}"`)) {
    throw new Error(`Missing project href: ${project.href}`);
  }

  if (!resumeSource.includes(`icon: <${project.icon} size={16} />`)) {
    throw new Error(`Missing ${project.icon} icon for ${project.title}`);
  }

  if (!resumeSource.includes(`description: "${project.description}"`)) {
    throw new Error(`Missing GitHub-based description for ${project.title}`);
  }
}
