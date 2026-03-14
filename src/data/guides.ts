import type { GuideDefinition } from "@/types/guides";

export const guides: GuideDefinition[] = [
  {
    id: "landed-cost-guide",
    href: "/how-to-calculate-landed-cost-for-imported-products",
    title: "How to Calculate Landed Cost for Imported Products",
    shortDescription:
      "Step-by-step landed-cost analysis with scenario comparison and fee-sensitivity chart for import pricing decisions.",
    practicalAngle:
      "Shows how shipping, duty, VAT, and handling charges move true per-unit cost.",
    helpsWith: "Setting price floors and avoiding margin leaks before listing products.",
    workflow: "import-cost",
    relatedTools: [
      { label: "Landed Cost Calculator", href: "/tools/landed-cost-calculator-importers" },
      { label: "Cost Per Unit After Fees", href: "/tools/cost-per-unit-after-shipping-import-fees" }
    ]
  },
  {
    id: "discount-margin-guide",
    href: "/how-discounts-affect-profit-margin",
    title: "How Discounts Affect Profit Margin",
    shortDescription:
      "Operational discount economics guide covering margin compression, required volume lift, and promo decision thresholds.",
    practicalAngle:
      "Compares 5% to 20% discount depth and quantifies when revenue growth still harms profit.",
    helpsWith: "Choosing safer promo depth, bundle strategy, and margin-protection rules.",
    workflow: "profit-margin",
    relatedTools: [
      { label: "Discount Impact Calculator", href: "/tools/discount-impact-on-margin-calculator" },
      { label: "Margin After Shipping Fees", href: "/tools/margin-calculator-after-shipping-fees" }
    ]
  },
  {
    id: "reorder-point-guide",
    href: "/how-to-calculate-reorder-point-with-lead-time",
    title: "How to Calculate Reorder Point with Lead Time",
    shortDescription:
      "Inventory planning guide with lead-time demand logic, demand scenarios, and reorder threshold sensitivity analysis.",
    practicalAngle:
      "Shows how daily sales, lead-time assumptions, and safety stock policy shift reorder timing.",
    helpsWith: "Reducing stockout risk and setting more realistic SKU-level reorder alerts.",
    workflow: "inventory-planning",
    relatedTools: [
      { label: "Reorder Point Calculator", href: "/tools/reorder-point-calculator-lead-time" },
      { label: "Safety Stock Calculator", href: "/tools/safety-stock-calculator-ecommerce" },
      { label: "Upload Inventory CSV", href: "/tools/upload-inventory-csv-reorder-alerts" }
    ]
  }
];

export const guidesByWorkflow = new Map(guides.map((guide) => [guide.workflow, guide]));
