export type ToolCategory =
  | "import-cost"
  | "profit-margin"
  | "inventory-planning"
  | "marketplace-seller";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface WorkedExample {
  title: string;
  description: string;
  values: string[];
}

export interface ToolDefinition {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  category: ToolCategory;
  featured: boolean;
  relatedTools: string[];
  seoTitle: string;
  seoDescription: string;
  h1: string;
  heroDescription: string;
  workedExample: WorkedExample;
  howToUse: string[];
  commonMistakes: string[];
  faq: FAQItem[];
}

export interface ToolCategoryDefinition {
  id: ToolCategory;
  slug: string;
  title: string;
  h1: string;
  description: string;
  toolSlugs: string[];
  relatedCategoryIds: ToolCategory[];
  faq: FAQItem[];
}