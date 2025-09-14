"use client";

import Link from "next/link";
import Image from "next/image";
import type { Blog } from "@/types/database";

/** =========================
 *  Types
 *  ========================= */
export type Post = {
  id: string;
  title: string;
  date: string | Date; // ISO string or Date
  image: string; // URL (public path atau CDN)
  link: string; // URL ke post/detail
  excerpt?: string;
  reading_time?: number;
  category?: string;
};

/** =========================
 *  Utils
 *  ========================= */
function formatDate(d: string | Date, locale = "en-US") {
  const date = typeof d === "string" ? new Date(d) : d;
  // contoh: Sep 14, 2025
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
}

/** =========================
 *  Component
 *  ========================= */
export default function BlogSection({
  id = "blog",
  blogs = [],
  label = "Blog",
  heading = "Latest posts",
  intro = "Notes on engineering, system design, and building real-world products.",
}: {
  id?: string;
  blogs?: Blog[];
  label?: string;
  heading?: string;
  intro?: string;
}) {
  // Transform blog data to post format
  const posts: Post[] = blogs.map(blog => ({
    id: blog.id,
    title: blog.title,
    date: blog.published_at || blog.created_at || new Date().toISOString(),
    image: blog.featured_image || '/night-background.jpg', // fallback image
    link: `/blog/${blog.slug}`,
    excerpt: blog.excerpt || undefined,
    reading_time: blog.reading_time || undefined,
    category: blog.category || undefined,
  }));
  return (
    <section
      id={id}
      className="scroll-mt-24 bg-gray-50 py-16 md:py-32 dark:bg-transparent"
    >
      <div className="mx-auto max-w-5xl border-t px-6">
        {/* Label kecil di atas border */}
        <span className="text-caption -ml-6 -mt-3.5 block w-max bg-gray-50 px-6 dark:bg-gray-950">
          {label}
        </span>

        {/* Heading & Intro */}
        <div className="mt-12 gap-4 sm:grid sm:grid-cols-2 md:mt-24">
          <div className="sm:w-2/5">
            <h2 className="text-3xl font-bold sm:text-4xl">{heading}</h2>
          </div>
          <div className="mt-6 sm:mt-0">
            <p>{intro}</p>
          </div>
        </div>

        {/* Grid Cards (pertahankan desain) */}
        <div className="mt-12 md:mt-24">
          {posts.length > 0 ? (
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <article key={post.id ?? index} className="group overflow-hidden">
                  {/* Image */}
                  <div className="relative h-96 w-full">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="rounded-md object-cover object-top grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:h-[22.5rem] group-hover:rounded-xl"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      priority={index < 2}
                    />
                  </div>

                  {/* Meta */}
                  <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 pr-2">
                        <h3 className="text-base font-medium transition-all duration-500 group-hover:tracking-wider line-clamp-2">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                      <span className="text-xs flex-shrink-0">_0{index + 1}</span>
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {/* Date */}
                        <time
                          className="text-muted-foreground inline-block translate-y-6 text-sm opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                          dateTime={
                            typeof post.date === "string"
                              ? post.date
                              : (post.date as Date).toISOString()
                          }
                          suppressHydrationWarning
                        >
                          {formatDate(post.date)}
                        </time>
                        
                        {/* Reading time */}
                        {post.reading_time && (
                          <span className="text-muted-foreground text-xs opacity-0 transition duration-300 group-hover:opacity-100">
                            • {post.reading_time} min read
                          </span>
                        )}
                      </div>

                      {/* Link */}
                      <Link
                        href={post.link}
                        className="inline-block translate-y-8 text-sm tracking-wide opacity-0 transition-all duration-500 hover:underline group-hover:translate-y-0 group-hover:opacity-100 group-hover:text-primary-600 dark:group-hover:text-primary-400"
                      >
                        Read post
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No blog posts available yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

