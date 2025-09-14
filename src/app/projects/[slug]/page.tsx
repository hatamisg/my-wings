import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ChevronLeft, ExternalLink, Github } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/types/database";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

async function getProject(slug: string): Promise<Project | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) return null;
  return data;
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return notFound();

  const date = project.published_at || project.created_at || undefined;
  const dateFormatted = date
    ? new Date(date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-6">
        <Button asChild variant="ghost" size="sm">
          <Link href="/">
            <ChevronLeft className="mr-1 h-4 w-4" /> Back
          </Link>
        </Button>
      </div>

      <header className="space-y-3">
        <h1 className="text-3xl font-semibold md:text-4xl">{project.title}</h1>
        <div className="text-sm text-muted-foreground flex items-center gap-3">
          {project.author && <span>By {project.author}</span>}
          {dateFormatted && (
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> {dateFormatted}
            </span>
          )}
        </div>
      </header>

      <div className="mt-6 flex flex-wrap gap-2">
        {(project.technologies || []).map((t) => (
          <Badge key={t} variant="secondary">
            {t}
          </Badge>
        ))}
      </div>

      {project.screenshots && project.screenshots.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-medium mb-4">Screenshots</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {project.screenshots.slice(0, 4).map((url, idx) => (
              <div
                key={idx}
                className="relative h-64 w-full overflow-hidden rounded-lg border"
              >
                <Image
                  src={url}
                  alt={`Screenshot ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="mt-6 flex gap-2">
        {project.github_url && (
          <Button asChild variant="outline">
            <Link href={project.github_url} target="_blank" rel="noreferrer">
              <Github className="mr-1 h-4 w-4" /> Source Code
            </Link>
          </Button>
        )}
        {project.live_url && (
          <Button asChild>
            <Link href={project.live_url} target="_blank" rel="noreferrer">
              <ExternalLink className="mr-1 h-4 w-4" /> Live Demo
            </Link>
          </Button>
        )}
      </div>

      {project.short_description && (
        <p className="mt-6 text-lg text-muted-foreground">
          {project.short_description}
        </p>
      )}

      {project.features && project.features.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-medium mb-2">Features</h2>
          <ul className="list-disc pl-5 space-y-1">
            {project.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </section>
      )}

      {(project.content || project.description) && (
        <section className="mt-10 prose prose-zinc dark:prose-invert max-w-none">
          <h2>About this project</h2>
          <p style={{ whiteSpace: "pre-line" }}>
            {project.content || project.description}
          </p>
        </section>
      )}
    </div>
  );
}
