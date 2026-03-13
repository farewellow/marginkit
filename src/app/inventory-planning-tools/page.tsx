import { CategoryHub } from "@/components/marketing/category-hub";
import { categoryDefinitions } from "@/data/tools";
import { buildMetadata } from "@/lib/seo/metadata";

const category = (() => {
  const found = categoryDefinitions.find((item) => item.slug === "inventory-planning-tools");
  if (!found) throw new Error("Category config missing: inventory-planning-tools");
  return found;
})();

export const metadata = buildMetadata({
  title: "Inventory Planning Tools for Reorder and Safety Stock",
  description:
    "Plan reorder points, safety stock, and inventory runway with practical calculators and CSV alerts.",
  pathname: "/inventory-planning-tools"
});

export default function InventoryPlanningToolsPage() {
  return <CategoryHub category={category} />;
}
