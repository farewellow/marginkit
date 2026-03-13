"use client";

import { useMemo, useState } from "react";

import { ToolCard } from "@/components/marketing/tool-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categoryDefinitions, tools } from "@/data/tools";
import type { ToolCategory } from "@/types/tools";

type DirectoryFilter = "all" | ToolCategory;

export function ToolsDirectory() {
  const [filter, setFilter] = useState<DirectoryFilter>("all");

  const filteredTools = useMemo(() => {
    if (filter === "all") return tools;
    return tools.filter((tool) => tool.category === filter);
  }, [filter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>All tools</Button>
        {categoryDefinitions.map((category) => (
          <Button
            key={category.id}
            size="sm"
            variant={filter === category.id ? "default" : "outline"}
            onClick={() => setFilter(category.id)}
          >
            {category.title}
          </Button>
        ))}
        <Badge variant="secondary" className="ml-auto">{filteredTools.length} tools</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}
