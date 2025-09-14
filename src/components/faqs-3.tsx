"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";

type FAQItem = {
  id: string;
  icon: IconName;
  question: string;
  answer: string;
};

export default function FAQsThree({ id = "faqs" }: { id?: string }) {
  const faqItems: FAQItem[] = [
    {
      id: "item-1",
      icon: "puzzle",
      question: "What kind of projects do you take?",
      answer:
        "Full-stack web & mobile, system design, and creative problem-solving. Typical work includes Next.js apps, SwiftUI interfaces, AI-assisted features, clean UI systems, and SME digital tools.",
    },
    {
      id: "item-2",
      icon: "timer",
      question: "How long does an MVP usually take?",
      answer:
        "A focused MVP generally takes 1–3 weeks depending on scope, integrations, and feedback speed. I prefer tight iterations with clear milestones and demos.",
    },
    {
      id: "item-3",
      icon: "boxes",
      question: "What stack and tools do you prefer?",
      answer:
        "Next.js, Tailwind, shadcn/ui, TypeScript, Prisma, PostgreSQL, Firebase/Supabase, SwiftUI for iOS, and GitHub Actions for CI. I prioritize maintainability, scalability, and efficiency.",
    },
    {
      id: "item-4",
      icon: "git-branch",
      question: "Can you work with an existing codebase?",
      answer:
        "Yes. I start with a quick audit (structure, DX, performance, accessibility), propose a roadmap, and refactor incrementally to avoid breaking changes.",
    },
    {
      id: "item-5",
      icon: "globe",
      question: "How do we collaborate across time zones?",
      answer:
        "I work async-friendly (UTC+7). I use GitHub issues/PRs, short Loom videos, and lightweight docs. Weekly checkpoints keep scope and progress transparent.",
    },
  ];

  return (
    <section id={id} className="scroll-mt-24 bg-muted py-20 dark:bg-background">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:gap-16">
          {/* Sidebar */}
          <div className="md:w-1/3">
            <div className="sticky top-20">
              <h2 className="mt-4 text-3xl font-bold">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-muted-foreground">
                Can’t find what you’re looking for?{" "}
                <Link
                  href="#contact"
                  className="font-medium text-primary hover:underline"
                >
                  Contact me
                </Link>
              </p>
            </div>
          </div>

          {/* Accordion */}
          <div className="md:w-2/3">
            <Accordion type="single" collapsible className="w-full space-y-2">
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="rounded-lg border bg-background px-4 shadow-xs last:border-b"
                >
                  <AccordionTrigger className="cursor-pointer items-center py-5 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="flex size-6">
                        <DynamicIcon
                          name={item.icon}
                          className="m-auto size-4"
                        />
                      </div>
                      <span className="text-base">{item.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <div className="px-9">
                      <p className="text-base">{item.answer}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
