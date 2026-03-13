import { CategoryHub } from "@/components/marketing/category-hub";
import { categoryDefinitions } from "@/data/tools";
import { buildMetadata } from "@/lib/seo/metadata";

const category = (() => {
  const found = categoryDefinitions.find((item) => item.slug === "marketplace-seller-tools");
  if (!found) throw new Error("Category config missing: marketplace-seller-tools");
  return found;
})();

export const metadata = buildMetadata({
  title: "Marketplace Seller Tools for Pricing and ROAS",
  description:
    "Calculate break-even selling price, break-even ROAS, and variable-cost margin for marketplace and DTC channels.",
  pathname: "/marketplace-seller-tools"
});

export default function MarketplaceSellerToolsPage() {
  return <CategoryHub category={category} />;
}
