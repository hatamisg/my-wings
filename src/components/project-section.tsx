import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Gemini,
  Replit,
  MagicUI,
  VSCodium,
  MediaWiki,
  GooglePaLM,
} from "@/components/logos";

export type Project = {
  id: string;
  name: string;
  description: string;
  href: string;
  stack: string[];
  logo: React.ReactNode;
};

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: "gemini",
    name: "Chat Assistant with Gemini",
    description:
      "Conversational AI assistant with tool-use and streaming UI built on Gemini.",
    href: "https://github.com/hatamisg",
    stack: ["Next.js", "TypeScript", "Shadcn UI", "Vercel"],
    logo: <Gemini />,
  },
  {
    id: "replit",
    name: "Code Runner on Replit",
    description:
      "Instant code execution sandbox with persistent sessions and sharing.",
    href: "https://replit.com/",
    stack: ["Node.js", "WebSocket", "Prisma"],
    logo: <Replit />,
  },
  {
    id: "magicui",
    name: "UI Kit using MagicUI",
    description:
      "Composable UI primitives and themes for fast app prototyping.",
    href: "https://magicui.design/",
    stack: ["React", "Tailwind", "CVA"],
    logo: <MagicUI />,
  },
  {
    id: "vscodium",
    name: "Dev Environment Sync",
    description:
      "Portable editor setup with shared extensions and workspace templates.",
    href: "https://vscodium.com/",
    stack: ["VSCode", "Dotfiles", "CI"],
    logo: <VSCodium />,
  },
  {
    id: "mediawiki",
    name: "Docs Hub with MediaWiki",
    description: "Searchable documentation hub with custom templates and auth.",
    href: "https://www.mediawiki.org/",
    stack: ["PHP", "MySQL", "Nginx"],
    logo: <MediaWiki />,
  },
  {
    id: "palm",
    name: "Knowledge Graph with PaLM",
    description: "Entity extraction and graph explorer for research datasets.",
    href: "https://ai.google/",
    stack: ["Python", "Neo4j", "GCP"],
    logo: <GooglePaLM />,
  },
];

type ProjectSectionProps = {
  id?: string;
  projects?: Project[];
  title?: string;
  subtitle?: string;
};

export default function ProjectSection({
  id = "projects",
  projects = DEFAULT_PROJECTS,
  title = "Projects",
  subtitle = "Work that unites engineering discipline, thoughtful design, and creative impact.",
}: ProjectSectionProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-semibold md:text-4xl">
              {title}
            </h2>
            <p className="text-muted-foreground mt-6">{subtitle}</p>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="p-6">
      <div className="relative">
        <div className="*:size-10">{project.logo}</div>

        <div className="space-y-2 py-6">
          <h3 className="text-base font-medium">{project.name}</h3>
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {project.description}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <Badge key={s} variant="secondary">
                {s}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-3 border-t border-dashed pt-6">
          <Button
            asChild
            variant="secondary"
            size="sm"
            className="gap-1 pr-2 shadow-none"
          >
            <Link href={project.href} target="_blank" rel="noreferrer">
              View Project
              <ChevronRight className="ml-0 !size-3.5 opacity-50" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
