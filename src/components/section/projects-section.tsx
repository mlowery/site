import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsSection() {
    return (
            <div className="flex min-h-0 flex-col gap-y-4">
                <div className="flex min-h-0 flex-col gap-y-2">
                    <h2 className="text-xl font-bold">{DATA.sections.projects.heading}</h2>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        {DATA.sections.projects.text}
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 auto-rows-fr">
                    {DATA.projects.map((project, id) => (
                        <BlurFade
                            key={project.title}
                            delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                            className="h-full"
                        >
                            <ProjectCard
                                href={project.href}
                                key={project.title}
                                title={project.title}
                                description={project.description}
                                dates={project.dates}
                                tags={project.technologies}
                                icon={project.icon}
                                iconTone={project.iconTone}
                                image={project.image}
                                video={project.video}
                                links={project.links}
                            />
                        </BlurFade>
                    ))}
                </div>
            </div>
    );
}
