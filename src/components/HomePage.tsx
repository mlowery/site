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
import { ArrowUpRight } from "lucide-react";
import {
  SiApachecassandra,
  SiApachecouchdb,
  SiClaude,
  SiDocker,
  SiGit,
  SiGithubactions,
  SiGnubash,
  SiGo,
  SiGooglegemini,
  SiGrafana,
  SiKubernetes,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiOpenjdk,
  SiOpenstack,
  SiPrometheus,
  SiPython,
  SiRedis,
  SiRuby,
  SiApachecassandraHex,
  SiApachecouchdbHex,
  SiClaudeHex,
  SiDockerHex,
  SiGitHex,
  SiGithubactionsHex,
  SiGnubashHex,
  SiGoHex,
  SiGooglegeminiHex,
  SiGrafanaHex,
  SiKubernetesHex,
  SiLinuxHex,
  SiMongodbHex,
  SiMysqlHex,
  SiOpenjdkHex,
  SiOpenstackHex,
  SiPrometheusHex,
  SiPythonHex,
  SiRedisHex,
  SiRubyHex,
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
    Java: { icon: SiOpenjdk, color: SiOpenjdkHex },
    Shell: { icon: SiGnubash, color: SiGnubashHex },
    Kubernetes: { icon: SiKubernetes, color: SiKubernetesHex },
    Docker: { icon: SiDocker, color: SiDockerHex },
    GitOps: { icon: SiGit, color: SiGitHex },
    "CI/CD": { icon: SiGithubactions, color: SiGithubactionsHex },
    "Cloud infrastructure": { icon: SiLinux, color: SiLinuxHex },
    "Bare metal": { icon: SiLinux, color: SiLinuxHex },
    MySQL: { icon: SiMysql, color: SiMysqlHex },
    MongoDB: { icon: SiMongodb, color: SiMongodbHex },
    Couchbase: { icon: SiApachecouchdb, color: SiApachecouchdbHex },
    Cassandra: { icon: SiApachecassandra, color: SiApachecassandraHex },
    Redis: { icon: SiRedis, color: SiRedisHex },
    "OpenStack Trove": { icon: SiOpenstack, color: SiOpenstackHex },
    Observability: { icon: SiPrometheus, color: SiPrometheusHex },
    Prometheus: { icon: SiPrometheus, color: SiPrometheusHex },
    Grafana: { icon: SiGrafana, color: SiGrafanaHex },
    Gemini: { icon: SiGooglegemini, color: SiGooglegeminiHex },
    Claude: { icon: SiClaude, color: SiClaudeHex },
  };
  const logoMap: Record<string, string> = {
    ChatGPT: "/logos/chatgpt.svg",
    Gemini: "/logos/gemini.svg",
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

  return <img src={logo} alt="" className="size-4 object-contain dark:invert" />;
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
