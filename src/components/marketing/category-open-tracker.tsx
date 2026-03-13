"use client";

import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";

interface CategoryOpenTrackerProps {
  categorySlug: string;
}

export function CategoryOpenTracker({ categorySlug }: CategoryOpenTrackerProps) {
  useEffect(() => {
    trackEvent("category_opened", { category_slug: categorySlug });
  }, [categorySlug]);

  return null;
}