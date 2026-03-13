import { CategoryHub } from "@/components/marketing/category-hub";
import { categoryDefinitions } from "@/data/tools";
import { buildMetadata } from "@/lib/seo/metadata";

const category = (() => {
  const found = categoryDefinitions.find((item) => item.slug === "profit-margin-tools");
  if (!found) throw new Error("Category config missing: profit-margin-tools");
  return found;
})();

export const metadata = buildMetadata({
  title: "Profit Margin Tools for Resellers and E-commerce",
  description:
    "Model margin, markup, discount impact, and supplier cost changes to protect SKU-level profitability.",
  pathname: "/profit-margin-tools"
});

export default function ProfitMarginToolsPage() {
  return <CategoryHub category={category} />;
}
