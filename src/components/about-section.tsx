"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BorderBeam } from "@/components/magicui/border-beam";
import {
  ChartBarIncreasingIcon,
  Database,
  Fingerprint,
  IdCard,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AboutSection({
  id = "about",
  className,
}: {
  id?: string;
  className?: string;
}) {
  type ImageKey = "item-1" | "item-2" | "item-3" | "item-4";
  const [activeItem, setActiveItem] = useState<ImageKey>("item-1");

  // Ganti path gambar ini sesuai aset kamu (letakkan di /public)
  const images: Record<ImageKey, { image: string; alt: string }> = {
    "item-1": { image: "/about-you.png", alt: "UMKM digitalization showcase" },
    "item-2": {
      image: "/about-you.png",
      alt: "Secure authentication and AI context",
    },
    "item-3": {
      image: "/about-you.png",
      alt: "Productivity tools & integrations",
    },
    "item-4": {
      image: "/about-you.png",
      alt: "Analytics dashboard & insights",
    },
  };

  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-12 md:py-20 lg:py-32", className)}
    >
      {/* Background layer */}
      <div className="bg-linear-to-b absolute inset-0 -z-10 sm:inset-6 sm:rounded-b-3xl dark:block dark:to-[color-mix(in_oklab,var(--color-zinc-900)_75%,var(--color-background))]" />

      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12 lg:space-y-16 dark:[--color-border:color-mix(in_oklab,var(--color-white)_10%,transparent)]">
        {/* Intro */}
        <div className="relative z-10 mx-auto max-w-2xl space-y-5 text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-6xl">
            About Me
          </h2>
          <p className="text-muted-foreground">
            I’m an Informatics Engineer and a farmer who blends technology with
            everyday life. I help SMEs (UMKM) go digital—shipping practical,
            user-friendly apps powered by modern web, mobile, and AI context
            engineering.
          </p>

          {/* Quick stats */}
          <div className="mx-auto grid max-w-md grid-cols-3 gap-3 text-sm">
            <Stat label="Projects" value="10+" />
            <Stat label="SMEs Helped" value="5+" />
            <Stat label="GPA" value="3.57" />
          </div>
        </div>

        {/* Content */}
        <div className="grid gap-12 sm:px-12 md:grid-cols-2 lg:gap-20 lg:px-0">
          {/* Left: Accordion */}
          <Accordion
            type="single"
            value={activeItem}
            onValueChange={(value) =>
              setActiveItem((value || "item-1") as ImageKey)
            }
            className="w-full"
            collapsible
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center gap-2 text-base">
                  <Database className="size-4" />
                  UMKM Digitalization
                </div>
              </AccordionTrigger>
              <AccordionContent>
                I build landing pages, lightweight dashboards, and simple
                automations to help SMEs sell, validate ideas, and operate
                online more efficiently.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                <div className="flex items-center gap-2 text-base">
                  <Fingerprint className="size-4" />
                  AI Context & Secure Auth
                </div>
              </AccordionTrigger>
              <AccordionContent>
                My expertise spans AI context engineering and full-stack
                development, with an emphasis on secure authentication, modern
                system design, scalability, and efficiency.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                <div className="flex items-center gap-2 text-base">
                  <IdCard className="size-4" />
                  Tools I Use
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Next.js, Tailwind, shadcn/ui, SwiftUI, Appwrite, Supabase,
                Prisma, Firebase, and GitHub Actions. I value clean DX,
                predictable state, and readable UI systems.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>
                <div className="flex items-center gap-2 text-base">
                  <ChartBarIncreasingIcon className="size-4" />
                  Analytics & Impact
                </div>
              </AccordionTrigger>
              <AccordionContent>
                I track what matters: adoption, retention, and feedback
                loops—turning insights into focused UI/UX improvements.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Right: Image Panel */}
          <div className="bg-background relative flex overflow-hidden rounded-3xl border p-2">
            <div className="w-15 absolute inset-0 right-0 ml-auto border-l bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_8px)]" />
            <div className="aspect-76/59 bg-background relative w-[calc(3/4*100%+3rem)] rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeItem}-id`}
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="size-full overflow-hidden rounded-2xl border bg-zinc-900 shadow-md"
                >
                  <Image
                    src={images[activeItem].image}
                    alt={images[activeItem].alt}
                    width={1207}
                    height={929}
                    className="size-full object-cover object-left-top"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <BorderBeam
              duration={6}
              size={200}
              className="from-transparent via-yellow-700 to-transparent dark:via-white/50"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border p-3">
      <div className="text-xl font-semibold">{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}
