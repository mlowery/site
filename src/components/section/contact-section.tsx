import { DATA } from "@/data/resume";

export default function ContactSection() {
  return (
    <div className="flex min-h-0 flex-col gap-y-4">
      <h2 className="text-xl font-bold">{DATA.sections.contact.heading}</h2>
      <div className="rounded-lg border bg-background p-4 ring-2 ring-border/20">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {DATA.sections.contact.text.split('LinkedIn').map((part, i, arr) =>
            i < arr.length - 1 ? (
              <span key={i}>{part}<a href={DATA.contact.social.LinkedIn.url} target="_blank" rel="noopener noreferrer" className="font-medium text-foreground underline underline-offset-2 hover:text-primary transition-colors">LinkedIn</a></span>
            ) : part
          )}
        </p>
      </div>
    </div>
  );
}
