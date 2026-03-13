"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface HeroStat {
  label: string;
  value: string;
}

interface PageHeroProps {
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
  eyebrow?: string;
  stats?: HeroStat[];
}

export function PageHero({ title, description, children, className, eyebrow, stats }: PageHeroProps) {
  return (
    <section className={cn("relative py-8 sm:py-10", className)}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="relative overflow-hidden rounded-[28px] border border-primary/15 bg-white/90 px-6 py-10 shadow-soft sm:px-10 sm:py-12"
        >
          <div className="pointer-events-none absolute -right-14 -top-20 h-52 w-52 rounded-full bg-sky-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-teal-200/30 blur-3xl" />

          <div className="relative mx-auto max-w-4xl text-center">
            {eyebrow ? (
              <Badge variant="secondary" className="mb-4 border border-primary/15 bg-primary/5 text-primary">
                {eyebrow}
              </Badge>
            ) : null}

            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">{description}</p>

            {children ? <div className="mt-7 flex flex-wrap items-center justify-center gap-3">{children}</div> : null}

            {stats?.length ? (
              <div className="mx-auto mt-7 grid max-w-2xl gap-3 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-xl border bg-background/70 px-3 py-2 text-left sm:text-center">
                    <p className="text-lg font-semibold tracking-tight">{stat.value}</p>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
