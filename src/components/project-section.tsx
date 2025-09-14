import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Github, ExternalLink } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types/database";

// Fallback projects for when no data is available
export const FALLBACK_PROJECTS: Project[] = [];

type ProjectSectionProps = {
  id?: string;
  projects?: Project[];
  title?: string;
  subtitle?: string;
};

export default function ProjectSection({
  id = "projects",
  projects = FALLBACK_PROJECTS,
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
            {projects.length > 0 ? (
              projects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No projects available yet.</p>
              </div>
            )}
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
        {project.image_url ? (
          <div className="w-full h-40 relative rounded-md overflow-hidden mb-4">
            <Image
              src={project.image_url}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-40 bg-muted rounded-md mb-4 flex items-center justify-center">
            <div className="text-muted-foreground text-sm">No image</div>
          </div>
        )}

        <div className="space-y-2">
          <h3 className="text-base font-medium">{project.title}</h3>
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {project.short_description || project.description}
          </p>
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 4).map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{project.technologies.length - 4}
                </Badge>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-2 border-t border-dashed pt-4 mt-4">
          {project.live_url && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="gap-1 flex-1"
            >
              <Link href={project.live_url} target="_blank" rel="noreferrer">
                <ExternalLink className="h-3 w-3" />
                Live Demo
              </Link>
            </Button>
          )}
          {project.github_url && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="gap-1 flex-1"
            >
              <Link href={project.github_url} target="_blank" rel="noreferrer">
                <Github className="h-3 w-3" />
                Code
              </Link>
            </Button>
          )}
          {!project.live_url && !project.github_url && (
            <div className="text-center text-muted-foreground text-sm py-2 flex-1">
              Links coming soon
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
