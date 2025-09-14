"use client";

import Link from "next/link";
import Image from "next/image";

/** =========================
 *  Types
 *  ========================= */
export type Post = {
  id: string;
  title: string;
  date: string | Date; // ISO string or Date
  image: string; // URL (public path atau CDN)
  link: string; // URL ke post/detail
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
  posts = DEFAULT_POSTS,
  label = "Blog",
  heading = "Latest posts",
  intro = "Notes on engineering, system design, and building real-world products.",
}: {
  id?: string;
  posts?: Post[];
  label?: string;
  heading?: string;
  intro?: string;
}) {
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
                  <div className="flex justify-between">
                    <h3 className="text-base font-medium transition-all duration-500 group-hover:tracking-wider">
                      {post.title}
                    </h3>
                    <span className="text-xs">_0{index + 1}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    {/* Tanggal (menggantikan "role") */}
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

                    {/* Link */}
                    <Link
                      href={post.link}
                      className="inline-block translate-y-8 text-sm tracking-wide opacity-0 transition-all duration-500 hover:underline group-hover:translate-y-0 group-hover:opacity-100 group-hover:text-primary-600 dark:group-hover:text-primary-400"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Read post
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** =========================
 *  Default Data (contoh)
 *  Nanti ganti dari backend
 *  ========================= */
const DEFAULT_POSTS: Post[] = [
  {
    id: "sys-design-01",
    title: "Practical system design for small teams",
    date: "2025-08-30",
    image: "/night-background.jpg",
    link: "#",
  },
  {
    id: "ai-context-01",
    title: "AI context engineering: structure, prompts, and safety",
    date: "2025-07-18",
    image: "/night-background.jpg",
    link: "#",
  },
  {
    id: "fullstack-01",
    title: "Full-stack patterns with Next.js and clean UI systems",
    date: "2025-06-10",
    image: "/night-background.jpg",
    link: "#",
  },
  {
    id: "umkm-01",
    title: "Digitalizing SME workflows: hard-earned lessons",
    date: "2025-05-21",
    image: "/night-background.jpg",
    link: "#",
  },
  {
    id: "ios-01",
    title: "SwiftUI mental models for web developers",
    date: "2025-03-02",
    image: "/night-background.jpg",
    link: "#",
  },
  {
    id: "ops-01",
    title: "Deployment that scales: small budgets, big wins",
    date: "2025-01-12",
    image: "/night-background.jpg",
    link: "#",
  },
];

/** =========================
 *  Backend Integration Notes
 *  =========================
 * - Ganti `posts` via props dari fetch CMS/API:
 *    const res = await fetch('https://api.example.com/posts', { next: { revalidate: 3600 }})
 *    const posts = await res.json() as Post[]
 *    <BlogSection posts={posts} />
 *
 * - Jika tanggal dari backend bukan ISO, pastikan di-normalize sebelum dikirim ke komponen.
 * - Gambar bisa pakai CDN/public path. Untuk domain eksternal, tambahkan ke `next.config.js` -> images.domains.
 */
