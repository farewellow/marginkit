import { CategoryHub } from "@/components/marketing/category-hub";
import { categoryDefinitions } from "@/data/tools";
import { buildMetadata } from "@/lib/seo/metadata";

const category = (() => {
  const found = categoryDefinitions.find((item) => item.slug === "import-cost-tools");
  if (!found) throw new Error("Category config missing: import-cost-tools");
  return found;
})();

export const metadata = buildMetadata({
  title: "Import Cost Tools for Importers",
  description:
    "Calculate landed cost, unit cost after fees, and break-even pricing thresholds for import-driven products.",
  pathname: "/import-cost-tools"
});

export default function ImportCostToolsPage() {
  return <CategoryHub category={category} />;
}
