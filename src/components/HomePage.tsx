import React from "react";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import HackathonsSection from "@/components/section/hackathons-section";
import PhotosSection from "@/components/section/photos-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import {
  ArrowUpRight,
  BookOpen,
  Boxes,
  FileText,
  FlaskConical,
  Network,
  PenTool,
  Repeat2,
  ServerCog,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";
import {
  SiApachecassandra,
  SiApachecouchdb,
  SiClaude,
  SiDocker,
  SiGit,
  SiGnubash,
  SiGo,
  SiGooglegemini,
  SiGrafana,
  SiConfluence,
  SiJira,
  SiEtcd,
  SiKubernetes,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiOpenjdk,
  SiOpenstack,
  SiPrometheus,
  SiPython,
  SiRuby,
  SiTekton,
  SiApachecassandraHex,
  SiApachecouchdbHex,
  SiClaudeHex,
  SiDockerHex,
  SiGitHex,
  SiGnubashHex,
  SiGoHex,
  SiGooglegeminiHex,
  SiGrafanaHex,
  SiConfluenceHex,
  SiJiraHex,
  SiEtcdHex,
  SiKubernetesHex,
  SiLinuxHex,
  SiMongodbHex,
  SiMysqlHex,
  SiOpenjdkHex,
  SiOpenstackHex,
  SiPrometheusHex,
  SiPythonHex,
  SiRubyHex,
  SiTektonHex,
} from "@icons-pack/react-simple-icons";

const BLUR_FADE_DELAY = 0.04;

function SkillLogo({ name }: { name: string }) {
  const iconMap: Record<
    string,
    {
      icon: React.ComponentType<{ className?: string; color?: string; size?: number | string }>;
      color: string;
    }
  > = {
    Go: { icon: SiGo, color: SiGoHex },
    Python: { icon: SiPython, color: SiPythonHex },
    Ruby: { icon: SiRuby, color: SiRubyHex },
    Java: { icon: SiOpenjdk, color: "currentColor" },
    Shell: { icon: SiGnubash, color: SiGnubashHex },
    Kubernetes: { icon: SiKubernetes, color: SiKubernetesHex },
    etcd: { icon: SiEtcd, color: SiEtcdHex },
    Tekton: { icon: SiTekton, color: SiTektonHex },
    Linux: { icon: SiLinux, color: SiLinuxHex },
    Docker: { icon: SiDocker, color: SiDockerHex },
    GitOps: { icon: SiGit, color: SiGitHex },
    APIServer: { icon: ServerCog, color: "currentColor" },
    Operators: { icon: Workflow, color: "currentColor" },
    Federation: { icon: Network, color: "currentColor" },
    "Container registries": { icon: Boxes, color: "currentColor" },
    MySQL: { icon: SiMysql, color: SiMysqlHex },
    MongoDB: { icon: SiMongodb, color: SiMongodbHex },
    Cassandra: { icon: SiApachecassandra, color: SiApachecassandraHex },
    "OpenStack Trove": { icon: SiOpenstack, color: SiOpenstackHex },
    Prometheus: { icon: SiPrometheus, color: SiPrometheusHex },
    Grafana: { icon: SiGrafana, color: SiGrafanaHex },
    Jira: { icon: SiJira, color: SiJiraHex },
    Confluence: { icon: SiConfluence, color: SiConfluenceHex },
    "Release automation": { icon: Repeat2, color: "currentColor" },
    "Disaster recovery testing": { icon: ShieldCheck, color: "currentColor" },
    Testing: { icon: FlaskConical, color: "currentColor" },
    Runbooks: { icon: BookOpen, color: "currentColor" },
    Documentation: { icon: FileText, color: "currentColor" },
    Mentoring: { icon: Users, color: "currentColor" },
    "Technical Writing": { icon: PenTool, color: "currentColor" },
    Gemini: { icon: SiGooglegemini, color: SiGooglegeminiHex },
    Claude: { icon: SiClaude, color: SiClaudeHex },
  };
  const logoMap: Record<string, string> = {
    ChatGPT: "/logos/chatgpt.svg",
    CoreDNS: "/logos/coredns.svg",
    Couchbase: "/logos/couchbase.svg",
    DNS: "/logos/dns.svg",
    Gemini: "/logos/gemini.svg",
    Redis: "/logos/redis.svg",
    Claude: "/logos/claude.svg",
  };

  const iconConfig = iconMap[name];

  if (iconConfig) {
    const Icon = iconConfig.icon;
    return <Icon className="size-4 shrink-0" color={iconConfig.color} />;
  }

  const logo = logoMap[name];

  if (!logo) {
    return null;
  }

  return (
    <img
      src={logo}
      alt=""
      className="size-4 object-contain dark:brightness-0 dark:invert"
    />
  );
}

const sectionComponents: Record<string, React.ReactNode> = {
  about: (
    <section id="about">
      <div className="flex min-h-0 flex-col gap-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">{DATA.sections.about.heading}</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
            <Markdown>{DATA.summary}</Markdown>
          </div>
        </BlurFade>
      </div>
    </section>
  ),
  work: (
    <section id="work">
      <div className="flex min-h-0 flex-col gap-y-6">
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <h2 className="text-xl font-bold">{DATA.sections.work.heading}</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 6}>
          <WorkSection />
        </BlurFade>
      </div>
    </section>
  ),
  openSource: (
    <section id="open-source">
      <div className="flex min-h-0 flex-col gap-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <h2 className="text-xl font-bold">{DATA.sections.openSource.heading}</h2>
        </BlurFade>
        <div className="grid gap-3 sm:grid-cols-2">
          {DATA.openSource.map((item, id) => (
            <BlurFade key={item.name} delay={BLUR_FADE_DELAY * 8 + id * 0.05}>
              <div className="h-full rounded-lg border bg-background p-4 ring-2 ring-border/20">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold">{item.name}</h3>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    View all
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <div className="mt-4 grid gap-3">
                  {item.highlights.map((highlight) => (
                    <a
                      key={highlight.url}
                      href={highlight.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block rounded-md border border-border/70 bg-muted/20 p-3 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-[11px] font-medium uppercase tracking-normal text-muted-foreground">
                            {highlight.project}
                          </div>
                          <div className="mt-1 text-sm font-semibold leading-snug">
                            {highlight.title}
                          </div>
                        </div>
                        <ArrowUpRight className="mt-0.5 size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {highlight.detail}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  ),
  impact: (
    <section id="impact">
      <div className="flex min-h-0 flex-col gap-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <h2 className="text-xl font-bold">{DATA.sections.impact.heading}</h2>
        </BlurFade>
        <div className="grid gap-3 sm:grid-cols-3">
          {DATA.impact.map((item, id) => (
            <BlurFade key={item.label} delay={BLUR_FADE_DELAY * 6 + id * 0.05}>
              <div className="h-full rounded-lg border bg-background p-4 ring-2 ring-border/20">
                <div className="text-2xl font-semibold tracking-tight">{item.value}</div>
                <div className="mt-1 text-sm font-medium">{item.label}</div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  ),
  education: (
    <section id="education">
      <div className="flex min-h-0 flex-col gap-y-6">
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <h2 className="text-xl font-bold">{DATA.sections.education.heading}</h2>
        </BlurFade>
        <div className="flex flex-col gap-8">
          {DATA.education.map((education, index) => (
            <BlurFade key={education.school} delay={BLUR_FADE_DELAY * 8 + index * 0.05}>
              <a
                href={education.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-x-3 justify-between group"
              >
                <div className="flex items-center gap-x-3 flex-1 min-w-0">
                  {education.logoUrl ? (
                    <img
                      src={education.logoUrl}
                      alt={education.school}
                      className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
                    />
                  ) : (
                    <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
                  )}
                  <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                    <div className="font-semibold leading-none flex items-center gap-2">
                      {education.school}
                      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" aria-hidden />
                    </div>
                    <div className="font-sans text-sm text-muted-foreground">{education.degree}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                  <span>{education.start} - {education.end}</span>
                </div>
              </a>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  ),
  skills: (
    <section id="skills">
      <div className="flex min-h-0 flex-col gap-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 9}>
          <h2 className="text-xl font-bold">{DATA.sections.skills.heading}</h2>
        </BlurFade>
        <div className="grid gap-4">
          {DATA.skillGroups.map((group, groupId) => (
            <BlurFade key={group.name} delay={BLUR_FADE_DELAY * 10 + groupId * 0.05}>
              <div className="grid gap-2">
                <h3 className="text-sm font-semibold text-muted-foreground">{group.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <div
                      key={skill}
                      className="border bg-background border-border ring-2 ring-border/20 rounded-xl h-8 w-fit px-3 flex items-center gap-2"
                    >
                      <SkillLogo name={skill} />
                      <span className="text-foreground text-sm font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  ),
  projects: (
    <section id="projects">
      <BlurFade delay={BLUR_FADE_DELAY * 11}>
        <ProjectsSection />
      </BlurFade>
    </section>
  ),
  speaking: (
    <section id="speaking">
      <div className="flex min-h-0 flex-col gap-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 12}>
          <h2 className="text-xl font-bold">{DATA.sections.speaking.heading}</h2>
        </BlurFade>
        <div className="grid gap-3">
          {DATA.speaking.map((item, id) => (
            <BlurFade key={item.event} delay={BLUR_FADE_DELAY * 13 + id * 0.05}>
              <div className="rounded-lg border bg-background p-4 ring-2 ring-border/20">
                <h3 className="text-sm font-semibold">{item.event}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {item.topic}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  ),
  hackathons: (
    <section id="hackathons">
      <BlurFade delay={BLUR_FADE_DELAY * 13}>
        <HackathonsSection />
      </BlurFade>
    </section>
  ),
  photos: <PhotosSection />,
  contact: (
    <section id="contact">
      <BlurFade delay={BLUR_FADE_DELAY * 16}>
        <ContactSection />
      </BlurFade>
    </section>
  ),
  praise: (
    <section id="praise">
      <div className="flex min-h-0 flex-col gap-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 17}>
          <h2 className="text-xl font-bold">{DATA.sections.praise.heading}</h2>
        </BlurFade>
        <div className="grid gap-3">
          {DATA.praise.map((item, id) => (
            <BlurFade key={item.quote} delay={BLUR_FADE_DELAY * 18 + id * 0.05}>
              <figure className="rounded-lg border bg-background p-4 ring-2 ring-border/20">
                <blockquote className="text-sm leading-relaxed text-foreground">
                  "{item.quote}"
                </blockquote>
                <figcaption className="mt-2 text-xs text-muted-foreground">
                  {item.context}
                </figcaption>
              </figure>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  ),
};

export default function HomePage() {
  const orderedSections = Object.entries(DATA.sections)
    .filter(([, s]) => s.enabled)
    .sort(([, a], [, b]) => a.order - b.order)
    .map(([key]) => key);

  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 gap-y-6 flex flex-col md:flex-row justify-between">
            <div className="gap-2 flex flex-col order-2 md:order-1">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
              />
              <BlurFadeText
                className="text-muted-foreground max-w-[600px] md:text-lg lg:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
              <Avatar className="size-24 md:size-32 border rounded-full shadow-lg ring-4 ring-muted">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} className="object-cover object-center" />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      {orderedSections.map((key) => (
        <React.Fragment key={key}>
          {sectionComponents[key]}
        </React.Fragment>
      ))}
    </main>
  );
}
