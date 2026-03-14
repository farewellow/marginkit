export interface GuideToolLink {
  label: string;
  href: string;
}

export type GuideWorkflow = "import-cost" | "profit-margin" | "inventory-planning";

export interface GuideDefinition {
  id: string;
  href: string;
  title: string;
  shortDescription: string;
  practicalAngle: string;
  helpsWith: string;
  workflow: GuideWorkflow;
  relatedTools: GuideToolLink[];
}
