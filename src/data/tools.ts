import type { ToolCategoryDefinition, ToolDefinition } from "@/types/tools";

export const tools: ToolDefinition[] = [
  {
    id: "landed-cost-calculator-importers",
    slug: "landed-cost-calculator-importers",
    title: "Landed Cost Calculator for Importers",
    shortDescription: "Calculate your full landed cost and unit economics including shipping, duty, tax, and extra fees.",
    category: "import-cost",
    featured: true,
    relatedTools: [
      "cost-per-unit-after-shipping-import-fees",
      "import-profit-margin-calculator",
      "break-even-selling-price-after-import-costs"
    ],
    seoTitle: "Landed Cost Calculator for Importers | MarginKit",
    seoDescription:
      "Estimate total landed cost, cost per unit, and extra fees for imported products in minutes.",
    h1: "Landed Cost Calculator for Importers",
    heroDescription:
      "Get a clear landed-cost picture before you price your products. Include shipping, taxes, insurance, and all other fees in one view.",
    workedExample: {
      title: "Worked example",
      description: "Order of 1,000 units with import-related overhead:",
      values: [
        "Product cost: $12,000",
        "Shipping + duty + VAT + insurance + other fees: $4,250",
        "Total landed cost: $16,250",
        "Landed cost per unit: $16.25"
      ]
    },
    howToUse: [
      "Enter product cost as total order cost for the batch.",
      "Fill all extra cost lines to avoid hidden margin leaks.",
      "Use landed cost per unit as your baseline for pricing and margin analysis."
    ],
    commonMistakes: [
      "Ignoring handling or broker fees.",
      "Using estimated quantity instead of confirmed quantity.",
      "Mixing product-unit cost and total order cost in one field.",
      "Forgetting insurance for high-value shipments."
    ],
    faq: [
      {
        question: "Should product cost be per unit or total order value?",
        answer: "On this tool, product cost is total order cost for the full shipment."
      },
      {
        question: "Does landed cost include VAT?",
        answer: "Yes. Add VAT or import taxes in the dedicated field so the total is realistic."
      },
      {
        question: "Can I use this for small test orders?",
        answer: "Yes. It helps compare test-order economics before scaling."
      }
    ]
  },
  {
    id: "cost-per-unit-after-shipping-import-fees",
    slug: "cost-per-unit-after-shipping-import-fees",
    title: "Cost Per Unit After Shipping & Import Fees",
    shortDescription: "See exactly how shipping and import charges change your true unit cost.",
    category: "import-cost",
    featured: true,
    relatedTools: [
      "landed-cost-calculator-importers",
      "import-profit-margin-calculator",
      "margin-calculator-after-shipping-fees"
    ],
    seoTitle: "Cost Per Unit After Shipping & Import Fees Calculator | MarginKit",
    seoDescription:
      "Calculate cost per unit before and after shipping, import duty, VAT, and handling fees.",
    h1: "Cost Per Unit After Shipping & Import Fees",
    heroDescription:
      "Know your true unit economics before setting price. This calculator spreads all import fees across quantity for accurate cost per unit.",
    workedExample: {
      title: "Worked example",
      description: "Batch cost impact on unit economics:",
      values: [
        "Total product cost: $7,500 for 500 units",
        "Total fees: $1,450",
        "Base cost per unit: $15.00",
        "Cost per unit after fees: $17.90"
      ]
    },
    howToUse: [
      "Enter total product cost and exact quantity received.",
      "Add all variable import fees.",
      "Use resulting per-unit cost in margin and break-even tools."
    ],
    commonMistakes: [
      "Leaving duty blank when duty applies.",
      "Using planned quantity when actual quantity differs.",
      "Forgetting small but recurring handling fees."
    ],
    faq: [
      {
        question: "Why does unit cost jump so much?",
        answer: "Import overhead can be large relative to product cost, especially on low-volume orders."
      },
      {
        question: "Can I compare multiple suppliers?",
        answer: "Yes, run the calculator per supplier and compare the final unit cost after fees."
      },
      {
        question: "Should packaging be included?",
        answer: "Include packaging if it is part of variable landed cost for the batch."
      }
    ]
  },
  {
    id: "import-profit-margin-calculator",
    slug: "import-profit-margin-calculator",
    title: "Import Profit Margin Calculator",
    shortDescription: "Turn landed cost into clear profit, margin %, and markup % for better pricing decisions.",
    category: "profit-margin",
    featured: true,
    relatedTools: [
      "landed-cost-calculator-importers",
      "margin-calculator-after-shipping-fees",
      "supplier-cost-increase-impact-calculator"
    ],
    seoTitle: "Import Profit Margin Calculator | Margin & Markup | MarginKit",
    seoDescription: "Calculate cost per unit, profit per unit, total profit, margin %, and markup % from landed cost.",
    h1: "Import Profit Margin Calculator",
    heroDescription:
      "Convert total landed cost into actionable pricing metrics. See margin and markup side by side to avoid underpricing.",
    workedExample: {
      title: "Worked example",
      description: "Imported batch sold through e-commerce:",
      values: [
        "Total landed cost: $18,000 for 1,200 units",
        "Selling price per unit: $24",
        "Profit per unit: $9",
        "Margin: 37.5%"
      ]
    },
    howToUse: [
      "Input full landed cost for the order.",
      "Enter the exact sale price per unit.",
      "Review both margin and markup before deciding discounts."
    ],
    commonMistakes: [
      "Confusing markup with margin.",
      "Using retail price before marketplace commissions.",
      "Ignoring quantity mismatch between landed cost and sold units."
    ],
    faq: [
      {
        question: "What is the difference between margin and markup?",
        answer: "Margin is profit divided by selling price, markup is profit divided by cost."
      },
      {
        question: "Which metric should I optimize?",
        answer: "Most sellers manage by margin %, while markup is useful for supplier and pricing negotiations."
      },
      {
        question: "Can margin be negative?",
        answer: "Yes. Negative margin means you sell below all-in cost."
      }
    ]
  },
  {
    id: "supplier-cost-increase-impact-calculator",
    slug: "supplier-cost-increase-impact-calculator",
    title: "Supplier Cost Increase Impact Calculator",
    shortDescription: "Measure how supplier price changes affect margin and monthly profit instantly.",
    category: "profit-margin",
    featured: true,
    relatedTools: [
      "import-profit-margin-calculator",
      "margin-calculator-after-shipping-fees",
      "discount-impact-on-margin-calculator"
    ],
    seoTitle: "Supplier Cost Increase Impact Calculator | MarginKit",
    seoDescription: "See old vs new margin, monthly profit impact, and required price to preserve margin.",
    h1: "Supplier Cost Increase Impact Calculator",
    heroDescription:
      "When supplier costs go up, even slightly, profitability can drop fast. Quantify the damage and the price needed to protect your old margin.",
    workedExample: {
      title: "Worked example",
      description: "Cost rises from $10 to $11.20 with same sale price:",
      values: [
        "Selling price: $19",
        "Old margin: 47.4%",
        "New margin: 41.1%",
        "Monthly profit change at 2,000 units: -$2,400"
      ]
    },
    howToUse: [
      "Enter current and new cost per unit from supplier quotes.",
      "Keep selling price constant to see real impact.",
      "Use required price output for negotiation and repricing decisions."
    ],
    commonMistakes: [
      "Not testing monthly volume scenarios.",
      "Updating price without checking conversion impact.",
      "Ignoring packaging or freight changes that come with supplier updates."
    ],
    faq: [
      {
        question: "Why include monthly units sold?",
        answer: "Per-unit changes look small, but monthly volume shows true business impact."
      },
      {
        question: "Can this help with supplier negotiations?",
        answer: "Yes, it gives a numeric justification for target cost or price adjustments."
      },
      {
        question: "What if my selling price also changes?",
        answer: "Test multiple scenarios quickly by adjusting the selling price field."
      }
    ]
  },
  {
    id: "margin-calculator-after-shipping-fees",
    slug: "margin-calculator-after-shipping-fees",
    title: "Margin Calculator After Shipping Fees",
    shortDescription: "Calculate true margin after shipping, payment fees, and variable selling costs.",
    category: "profit-margin",
    featured: true,
    relatedTools: [
      "import-profit-margin-calculator",
      "discount-impact-on-margin-calculator",
      "break-even-roas-calculator-ecommerce"
    ],
    seoTitle: "Margin Calculator After Shipping Fees | MarginKit",
    seoDescription: "Estimate total cost, profit, margin %, and markup % after shipping and payment fees.",
    h1: "Margin Calculator After Shipping Fees",
    heroDescription:
      "See your real profitability after variable selling costs. Perfect for DTC and marketplace offers where fees quickly eat margin.",
    workedExample: {
      title: "Worked example",
      description: "Unit economics with channel costs:",
      values: [
        "Selling price: $39",
        "Product + shipping + payment + variable fees: $24.50",
        "Profit: $14.50",
        "Margin: 37.2%"
      ]
    },
    howToUse: [
      "Start with selling price per unit.",
      "Add all variable costs linked to each sale.",
      "Use results to decide if campaigns and discounts are safe."
    ],
    commonMistakes: [
      "Leaving payment processing fees out.",
      "Ignoring marketplace fulfillment charges.",
      "Comparing gross margin with ad-inclusive profitability."
    ],
    faq: [
      {
        question: "Should fixed overhead be included?",
        answer: "This tool focuses on variable per-unit economics. Add fixed costs separately for net margin planning."
      },
      {
        question: "Is shipping always variable?",
        answer: "For many sellers yes, but if shipping is blended into product pricing, adjust accordingly."
      },
      {
        question: "Can I use this for marketplaces?",
        answer: "Yes. Include marketplace and fulfillment fees inside other variable fees."
      }
    ]
  },
  {
    id: "discount-impact-on-margin-calculator",
    slug: "discount-impact-on-margin-calculator",
    title: "Discount Impact on Margin Calculator",
    shortDescription: "Understand how discounts affect margin and how many extra units you need to keep profit.",
    category: "profit-margin",
    featured: true,
    relatedTools: [
      "margin-calculator-after-shipping-fees",
      "supplier-cost-increase-impact-calculator",
      "break-even-roas-calculator-ecommerce"
    ],
    seoTitle: "Discount Impact on Margin Calculator | MarginKit",
    seoDescription: "Calculate discounted price, margin drop, and additional units needed to preserve total profit.",
    h1: "Discount Impact on Margin Calculator",
    heroDescription:
      "Before launching promotions, check if discounting still works financially. This tool shows your profit drop and required volume lift.",
    workedExample: {
      title: "Worked example",
      description: "10% discount on a product with $18 unit cost:",
      values: [
        "Original price: $30",
        "Discounted price: $27",
        "Old margin: 40.0%",
        "New margin: 33.3%"
      ]
    },
    howToUse: [
      "Enter regular price and unit cost.",
      "Set discount percentage and current sales volume.",
      "Check additional units needed to keep total monthly profit unchanged."
    ],
    commonMistakes: [
      "Assuming more traffic always offsets lower margins.",
      "Forgetting ad spend usually rises during promo periods.",
      "Running deep discounts on already thin-margin SKUs."
    ],
    faq: [
      {
        question: "Why can additional units become very high?",
        answer: "Small per-unit profit after discount means you need significantly more volume to keep the same profit."
      },
      {
        question: "What if new profit per unit is negative?",
        answer: "The tool flags this scenario and avoids impossible volume targets."
      },
      {
        question: "Is this useful for bundle discounts?",
        answer: "Yes, if you convert the bundle economics into per-unit price and cost inputs."
      }
    ]
  },
  {
    id: "reorder-point-calculator-lead-time",
    slug: "reorder-point-calculator-lead-time",
    title: "Reorder Point Calculator (Lead Time)",
    shortDescription: "Find when to reorder inventory based on lead time demand and safety stock.",
    category: "inventory-planning",
    featured: false,
    relatedTools: [
      "safety-stock-calculator-ecommerce",
      "days-of-inventory-left-calculator",
      "upload-inventory-csv-reorder-alerts"
    ],
    seoTitle: "Reorder Point Calculator (Lead Time) | MarginKit",
    seoDescription: "Calculate lead time demand and reorder point to reduce stockout risk.",
    h1: "Reorder Point Calculator (Lead Time)",
    heroDescription:
      "Set a practical reorder threshold based on your sales pace, lead times, and risk buffer.",
    workedExample: {
      title: "Worked example",
      description: "Typical reorder planning for fast-selling SKU:",
      values: [
        "Average daily sales: 22",
        "Lead time: 25 days",
        "Safety stock: 180 units",
        "Reorder point: 730 units"
      ]
    },
    howToUse: [
      "Use a realistic average daily sales value.",
      "Set lead time in calendar days based on supplier performance.",
      "Add safety stock to protect against delays and demand spikes."
    ],
    commonMistakes: [
      "Using outdated sales averages.",
      "Ignoring customs or fulfillment delays in lead time.",
      "Setting safety stock too low for seasonal products."
    ],
    faq: [
      {
        question: "How often should I update reorder point?",
        answer: "At least monthly, and immediately after demand or supplier changes."
      },
      {
        question: "Can reorder point be zero?",
        answer: "Only if daily sales and safety stock are both zero, which is uncommon for active SKUs."
      },
      {
        question: "Does this replace forecasting?",
        answer: "No. It is a fast operational threshold, not a full demand forecast model."
      }
    ]
  },
  {
    id: "safety-stock-calculator-ecommerce",
    slug: "safety-stock-calculator-ecommerce",
    title: "Safety Stock Calculator for E-commerce",
    shortDescription: "Calculate safety stock to protect against demand spikes and lead-time variability.",
    category: "inventory-planning",
    featured: false,
    relatedTools: [
      "reorder-point-calculator-lead-time",
      "days-of-inventory-left-calculator",
      "upload-inventory-csv-reorder-alerts"
    ],
    seoTitle: "Safety Stock Calculator for E-commerce | MarginKit",
    seoDescription: "Estimate a practical safety stock buffer using max vs average sales and lead time.",
    h1: "Safety Stock Calculator for E-commerce",
    heroDescription:
      "Protect your top SKUs from stockouts by calculating a data-backed safety stock buffer.",
    workedExample: {
      title: "Worked example",
      description: "Safety stock from demand and lead-time spread:",
      values: [
        "Max daily sales: 60",
        "Average daily sales: 35",
        "Max lead time: 28 days",
        "Average lead time: 21 days"
      ]
    },
    howToUse: [
      "Input peak and average demand from historical periods.",
      "Use max and average lead times from supplier records.",
      "Feed result into reorder point planning as buffer stock."
    ],
    commonMistakes: [
      "Using one-off outliers as max values.",
      "Confusing calendar days and business days.",
      "Not revisiting safety stock after seasonality shifts."
    ],
    faq: [
      {
        question: "What if result is negative?",
        answer: "The tool floors safety stock at zero since negative inventory buffer is not meaningful."
      },
      {
        question: "Can safety stock be too high?",
        answer: "Yes, high buffers increase holding cost and reduce cash efficiency."
      },
      {
        question: "Should every SKU have same safety stock?",
        answer: "Usually no. Fast movers and volatile SKUs often need larger buffers."
      }
    ]
  },
  {
    id: "days-of-inventory-left-calculator",
    slug: "days-of-inventory-left-calculator",
    title: "Days of Inventory Left Calculator",
    shortDescription: "Quickly estimate how many days your current stock can support average sales.",
    category: "inventory-planning",
    featured: false,
    relatedTools: [
      "reorder-point-calculator-lead-time",
      "safety-stock-calculator-ecommerce",
      "upload-inventory-csv-reorder-alerts"
    ],
    seoTitle: "Days of Inventory Left Calculator | MarginKit",
    seoDescription: "Estimate inventory runway based on current stock and average daily sales.",
    h1: "Days of Inventory Left Calculator",
    heroDescription:
      "Check your inventory runway in seconds and spot stockout risk before it disrupts sales.",
    workedExample: {
      title: "Worked example",
      description: "Runway check for a live SKU:",
      values: [
        "Current stock: 1,800 units",
        "Average daily sales: 75 units",
        "Days of inventory left: 24"
      ]
    },
    howToUse: [
      "Add current on-hand units.",
      "Use a realistic average daily sales rate.",
      "Compare runway vs supplier lead time to avoid stockouts."
    ],
    commonMistakes: [
      "Ignoring channel-specific demand spikes.",
      "Using old sales averages after promotions.",
      "Treating runway as static while demand changes."
    ],
    faq: [
      {
        question: "What if average daily sales is zero?",
        answer: "The tool shows a clear message because runway cannot be calculated with zero demand."
      },
      {
        question: "Is this enough for purchase planning?",
        answer: "Use it as a fast signal. Combine with reorder point and safety stock for better decisions."
      },
      {
        question: "Can I use weekly sales instead?",
        answer: "Convert weekly average to daily for accurate output."
      }
    ]
  },
  {
    id: "break-even-selling-price-after-import-costs",
    slug: "break-even-selling-price-after-import-costs",
    title: "Break-even Selling Price After Import Costs",
    shortDescription: "Set minimum selling price to cover cost, fees, and your target profit per unit.",
    category: "marketplace-seller",
    featured: false,
    relatedTools: [
      "landed-cost-calculator-importers",
      "import-profit-margin-calculator",
      "break-even-roas-calculator-ecommerce"
    ],
    seoTitle: "Break-even Selling Price After Import Costs | MarginKit",
    seoDescription: "Calculate the selling price needed to cover unit cost, fees, and target profit.",
    h1: "Break-even Selling Price After Import Costs",
    heroDescription:
      "Avoid underpricing imported goods. Define your target profit and see the minimum viable selling price instantly.",
    workedExample: {
      title: "Worked example",
      description: "Price floor setup for a new SKU:",
      values: [
        "Cost per unit: $11",
        "Shipping and fees per unit: $4",
        "Target profit per unit: $6",
        "Break-even selling price: $21"
      ]
    },
    howToUse: [
      "Enter total per-unit product cost.",
      "Add shipping and fee burden per unit.",
      "Set target profit to generate a pricing floor."
    ],
    commonMistakes: [
      "Using desired margin % but not converting to target profit.",
      "Leaving marketplace fees out of shipping/fees field.",
      "Ignoring future promo discount plans in floor pricing."
    ],
    faq: [
      {
        question: "Is this the final retail price?",
        answer: "It is the minimum price for your current cost and target profit assumptions."
      },
      {
        question: "Can I use zero target profit?",
        answer: "Yes, then the output becomes true break-even price before profit."
      },
      {
        question: "Should ad spend be included?",
        answer: "Usually ad spend is handled separately with ROAS and CAC analysis."
      }
    ]
  },
  {
    id: "break-even-roas-calculator-ecommerce",
    slug: "break-even-roas-calculator-ecommerce",
    title: "Break-even ROAS Calculator for E-commerce",
    shortDescription: "Find break-even CAC and ROAS based on your product economics before ad spend.",
    category: "marketplace-seller",
    featured: false,
    relatedTools: [
      "margin-calculator-after-shipping-fees",
      "discount-impact-on-margin-calculator",
      "break-even-selling-price-after-import-costs"
    ],
    seoTitle: "Break-even ROAS Calculator for E-commerce | MarginKit",
    seoDescription: "Calculate gross profit before ads, break-even CAC, and break-even ROAS for paid traffic decisions.",
    h1: "Break-even ROAS Calculator for E-commerce",
    heroDescription:
      "Understand your paid-traffic limits before scaling spend. This tool defines the CAC and ROAS thresholds you cannot exceed.",
    workedExample: {
      title: "Worked example",
      description: "Ad economics baseline:",
      values: [
        "Selling price: $55",
        "Product + shipping + variable costs: $33",
        "Break-even CAC: $22",
        "Break-even ROAS: 2.5"
      ]
    },
    howToUse: [
      "Input real selling price and variable costs only.",
      "Review break-even CAC before launching campaigns.",
      "Keep your target ROAS above break-even for healthy contribution margin."
    ],
    commonMistakes: [
      "Using blended order value instead of SKU-level value.",
      "Ignoring packaging and transaction fees.",
      "Scaling campaigns without recalculating after discounts."
    ],
    faq: [
      {
        question: "What if break-even CAC is negative?",
        answer: "The tool warns you because unit economics are already unprofitable before ads."
      },
      {
        question: "Is higher ROAS always better?",
        answer: "Generally yes, but growth strategy may allow lower ROAS temporarily for customer acquisition."
      },
      {
        question: "Can I apply this to marketplaces?",
        answer: "Yes, include marketplace variable costs in the input fields."
      }
    ]
  },
  {
    id: "upload-inventory-csv-reorder-alerts",
    slug: "upload-inventory-csv-reorder-alerts",
    title: "Upload Inventory CSV for Reorder Alerts",
    shortDescription: "Upload SKU inventory data, map columns, and generate reorder urgency alerts instantly.",
    category: "inventory-planning",
    featured: false,
    relatedTools: [
      "reorder-point-calculator-lead-time",
      "safety-stock-calculator-ecommerce",
      "days-of-inventory-left-calculator"
    ],
    seoTitle: "Inventory CSV Reorder Alerts Tool | MarginKit",
    seoDescription: "Upload inventory CSV, map required fields, and calculate reorder point with urgency status for each SKU.",
    h1: "Upload Inventory CSV for Reorder Alerts",
    heroDescription:
      "Move from spreadsheet chaos to quick stock risk visibility. Upload CSV data, map your columns, and get reorder alerts SKU by SKU.",
    workedExample: {
      title: "Worked example",
      description: "SKU-based reorder signal:",
      values: [
        "SKU A current stock: 320",
        "Reorder point: 350",
        "Status: Urgent"
      ]
    },
    howToUse: [
      "Upload a CSV with your SKU stock and sales fields.",
      "Map columns to required fields in the UI.",
      "Review the output table and prioritize urgent SKUs."
    ],
    commonMistakes: [
      "Uploading non-CSV files.",
      "Mapping wrong columns for lead time or safety stock.",
      "Not normalizing number formats before upload."
    ],
    faq: [
      {
        question: "Is my file stored on the server?",
        answer: "No. CSV parsing runs client-side in your browser and data is not stored as persistent account data."
      },
      {
        question: "What columns are required?",
        answer: "sku, current_stock, average_daily_sales, lead_time_days, safety_stock."
      },
      {
        question: "Can I export results?",
        answer: "Results are currently reviewed in-browser. Export options can be added in Pro."
      }
    ]
  }
];

export const categoryDefinitions: ToolCategoryDefinition[] = [
  {
    id: "import-cost",
    slug: "import-cost-tools",
    title: "Import Cost Tools",
    h1: "Import Cost Tools",
    description:
      "Estimate landed cost, unit cost after fees, and import pricing thresholds so you can protect margin before listing products.",
    toolSlugs: [
      "landed-cost-calculator-importers",
      "cost-per-unit-after-shipping-import-fees",
      "break-even-selling-price-after-import-costs"
    ],
    relatedCategoryIds: ["profit-margin", "inventory-planning"],
    faq: [
      {
        question: "Why focus on landed cost first?",
        answer: "Pricing and margin decisions are only accurate when full import costs are included."
      },
      {
        question: "Do these tools work for test orders?",
        answer: "Yes, they are useful for both small validation batches and scaled imports."
      },
      {
        question: "Can I use different currencies?",
        answer: "Use any numeric values consistently; output formatting defaults to USD."
      }
    ]
  },
  {
    id: "profit-margin",
    slug: "profit-margin-tools",
    title: "Profit & Margin Tools",
    h1: "Profit & Margin Tools",
    description:
      "Model margin, markup, discount impact, and supplier cost changes to keep product decisions profitable.",
    toolSlugs: [
      "import-profit-margin-calculator",
      "supplier-cost-increase-impact-calculator",
      "margin-calculator-after-shipping-fees",
      "discount-impact-on-margin-calculator"
    ],
    relatedCategoryIds: ["import-cost", "marketplace-seller"],
    faq: [
      {
        question: "Which metric is more important: margin or markup?",
        answer: "Margin is usually the core operating metric, while markup helps with cost-based pricing logic."
      },
      {
        question: "Should discounts be tested before campaigns?",
        answer: "Yes. Small discount changes can materially alter total monthly profit."
      },
      {
        question: "Can I use these tools for wholesale?",
        answer: "Yes, if your inputs reflect wholesale price and variable costs correctly."
      }
    ]
  },
  {
    id: "inventory-planning",
    slug: "inventory-planning-tools",
    title: "Inventory Planning Tools",
    h1: "Inventory Planning Tools",
    description:
      "Plan stock with reorder points, safety stock, runway checks, and CSV-driven urgency signals.",
    toolSlugs: [
      "reorder-point-calculator-lead-time",
      "safety-stock-calculator-ecommerce",
      "days-of-inventory-left-calculator",
      "upload-inventory-csv-reorder-alerts"
    ],
    relatedCategoryIds: ["import-cost", "marketplace-seller"],
    faq: [
      {
        question: "How often should inventory metrics be updated?",
        answer: "Weekly for active SKUs and immediately after major supplier or demand changes."
      },
      {
        question: "Is safety stock always required?",
        answer: "For fast-moving or unpredictable SKUs, yes, it protects against lead-time and demand uncertainty."
      },
      {
        question: "Can CSV workflow replace ERP?",
        answer: "It is a lightweight planning helper, not a full ERP replacement."
      }
    ]
  },
  {
    id: "marketplace-seller",
    slug: "marketplace-seller-tools",
    title: "Marketplace Seller Tools",
    h1: "Marketplace Seller Tools",
    description:
      "Optimize selling price and paid traffic economics with break-even and margin-aware calculators.",
    toolSlugs: [
      "break-even-selling-price-after-import-costs",
      "break-even-roas-calculator-ecommerce",
      "margin-calculator-after-shipping-fees",
      "discount-impact-on-margin-calculator"
    ],
    relatedCategoryIds: ["profit-margin", "inventory-planning"],
    faq: [
      {
        question: "Why is break-even ROAS important?",
        answer: "It sets the minimum efficiency target to avoid losing money on paid acquisition."
      },
      {
        question: "Should marketplace fees be included?",
        answer: "Yes. Include all variable channel costs for realistic economics."
      },
      {
        question: "Can I combine this with import calculators?",
        answer: "Yes. Start with landed cost tools, then layer on channel-level profitability tools."
      }
    ]
  }
];

export const featuredTools = tools.filter((tool) => tool.featured).slice(0, 6);

export const toolsBySlug = new Map(tools.map((tool) => [tool.slug, tool]));

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return toolsBySlug.get(slug);
}

export function getToolsByCategory(categoryId: ToolDefinition["category"]): ToolDefinition[] {
  return tools.filter((tool) => tool.category === categoryId);
}

export function getCategoryBySlug(slug: string): ToolCategoryDefinition | undefined {
  return categoryDefinitions.find((category) => category.slug === slug);
}

export function getCategoryById(id: ToolCategoryDefinition["id"]): ToolCategoryDefinition | undefined {
  return categoryDefinitions.find((category) => category.id === id);
}

export const allToolSlugs = tools.map((tool) => tool.slug);
