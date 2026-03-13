import type { InterpretationItem } from "@/components/calculator/interpretation-card";

export function interpretLandedCost(args: {
  totalExtraCosts: number;
  productCost: number;
  extraCostPerUnit: number;
  landedCostPerUnit: number;
}): InterpretationItem {
  const extraRatio = args.productCost > 0 ? args.totalExtraCosts / args.productCost : 0;

  if (extraRatio > 0.5) {
    return {
      label: "Import overhead is high relative to product cost",
      description: "Shipping, duty, and tax are taking a large share. Re-check supplier terms and logistics assumptions.",
      tone: "warning"
    };
  }

  if (args.extraCostPerUnit > args.landedCostPerUnit * 0.35) {
    return {
      label: "Extra costs per unit are significant",
      description: "Your per-unit fee burden is meaningful. Protect pricing and margin before launching campaigns.",
      tone: "warning"
    };
  }

  return {
    label: "Import overhead is manageable",
    description: "Cost structure looks balanced for planning price and margin decisions.",
    tone: "success"
  };
}

export function interpretCostPerUnitAfterFees(args: {
  baseCostPerUnit: number;
  costPerUnitAfterFees: number;
}): InterpretationItem {
  const increaseRatio = args.baseCostPerUnit > 0 ? args.costPerUnitAfterFees / args.baseCostPerUnit : 1;

  if (increaseRatio >= 1.25) {
    return {
      label: "Fees materially increase unit cost",
      description: "Landed overhead is strongly affecting economics. Validate profitability at your current sale price.",
      tone: "warning"
    };
  }

  return {
    label: "Unit economics remain controlled",
    description: "Fee burden is present but not extreme. Continue monitoring with margin tools.",
    tone: "success"
  };
}

export function interpretImportProfitMargin(args: { marginPercent: number }): InterpretationItem {
  if (args.marginPercent >= 30) {
    return {
      label: "Healthy margin",
      description: "Current pricing leaves solid room for operating costs and controlled promotions.",
      tone: "success"
    };
  }

  if (args.marginPercent >= 15) {
    return {
      label: "Margin is workable but should be monitored",
      description: "You still have profit, but channel fees or discounting could compress it quickly.",
      tone: "warning"
    };
  }

  return {
    label: "Margin is low and pricing may need review",
    description: "Review cost stack or selling price before scaling volume.",
    tone: "danger"
  };
}

export function interpretSupplierCostIncrease(args: {
  oldMargin: number;
  newMargin: number;
  monthlyProfitChange: number;
}): InterpretationItem {
  const marginDrop = args.oldMargin - args.newMargin;

  if (args.monthlyProfitChange < 0 && marginDrop >= 8) {
    return {
      label: "Cost increase materially reduces profit",
      description: "The margin drop is large enough to impact monthly contribution. Consider repricing or renegotiation.",
      tone: "danger"
    };
  }

  if (args.monthlyProfitChange < 0 && marginDrop >= 3) {
    return {
      label: "Margin compression is noticeable",
      description: "Profit remains positive, but cost pressure is visible. Monitor this SKU closely.",
      tone: "warning"
    };
  }

  return {
    label: "Supplier increase has limited impact",
    description: "Economics stay relatively stable under the current assumptions.",
    tone: "success"
  };
}

export function interpretMarginAfterFees(args: { marginPercent: number }): InterpretationItem {
  if (args.marginPercent >= 30) {
    return {
      label: "Contribution margin looks healthy",
      description: "You have enough room to absorb normal variable volatility.",
      tone: "success"
    };
  }

  if (args.marginPercent >= 15) {
    return {
      label: "Margin is moderate",
      description: "Profitable for now, but discounting or fee increases can quickly tighten returns.",
      tone: "warning"
    };
  }

  return {
    label: "Margin risk is high",
    description: "Review pricing and variable fees to avoid fragile unit economics.",
    tone: "danger"
  };
}

export function interpretDiscountImpact(args: {
  warning: string | null;
  oldMargin: number;
  newMargin: number;
}): InterpretationItem {
  if (args.warning) {
    return {
      label: "Discount may erase profitability",
      description: "At this discount level, unit profit may turn zero or negative.",
      tone: "danger"
    };
  }

  const marginDrop = args.oldMargin - args.newMargin;

  if (marginDrop >= 8) {
    return {
      label: "Discount materially reduces margin",
      description: "Volume may need to increase significantly to preserve current total profit.",
      tone: "warning"
    };
  }

  return {
    label: "Discount remains viable",
    description: "Promo impact appears manageable under current cost assumptions.",
    tone: "success"
  };
}

export function interpretReorderPoint(args: {
  leadTimeDemand: number;
  safetyStock: number;
  reorderPoint: number;
}): InterpretationItem {
  if (args.safetyStock <= 0) {
    return {
      label: "Safety stock may be too low",
      description: "No buffer is configured. Any demand spike or delay can trigger stockout risk.",
      tone: "warning"
    };
  }

  if (args.reorderPoint > 0 && args.safetyStock / args.reorderPoint < 0.12) {
    return {
      label: "Reorder threshold is aggressive",
      description: "Buffer share is relatively small versus lead-time demand. Consider a stronger cushion.",
      tone: "warning"
    };
  }

  return {
    label: "Current setup supports reorder planning",
    description: "Your threshold combines lead-time demand and safety stock in a practical way.",
    tone: "success"
  };
}

export function interpretSafetyStock(args: { safetyStock: number }): InterpretationItem {
  if (args.safetyStock <= 0) {
    return {
      label: "Calculated buffer is minimal",
      description: "Recent demand/lead-time spread may be low. Re-check data before lowering safety assumptions.",
      tone: "warning"
    };
  }

  return {
    label: "Safety buffer is established",
    description: "Use this value in your reorder point setup to reduce stockout exposure.",
    tone: "success"
  };
}

export function interpretDaysOfInventory(args: { daysLeft: number | null; warning: string | null }): InterpretationItem {
  if (args.warning) {
    return {
      label: "Sales movement is missing",
      description: "Days of inventory cannot be estimated without a positive average daily sales value.",
      tone: "warning"
    };
  }

  if (args.daysLeft !== null && args.daysLeft < 14) {
    return {
      label: "Stockout risk is high",
      description: "Inventory runway is short. Prioritize replenishment planning now.",
      tone: "danger"
    };
  }

  if (args.daysLeft !== null && args.daysLeft < 30) {
    return {
      label: "Reorder planning is recommended",
      description: "Runway is moderate and should be reviewed against supplier lead time.",
      tone: "warning"
    };
  }

  return {
    label: "Inventory runway looks healthy",
    description: "Current stock appears stable under average demand assumptions.",
    tone: "success"
  };
}

export function interpretBreakEvenSellingPrice(args: {
  targetProfitPerUnit: number;
  breakEvenSellingPrice: number;
}): InterpretationItem {
  if (args.targetProfitPerUnit <= 0) {
    return {
      label: "Pure break-even pricing",
      description: "This covers cost and fees but leaves no profit buffer.",
      tone: "warning"
    };
  }

  return {
    label: "Pricing floor includes target profit",
    description: "Use this as your minimum safe sale price in channel and promo planning.",
    tone: "success"
  };
}

export function interpretBreakEvenRoas(args: {
  breakEvenCac: number;
  breakEvenRoas: number | null;
  warning: string | null;
}): InterpretationItem {
  if (args.warning || args.breakEvenCac <= 0) {
    return {
      label: "Ad economics look fragile",
      description: "Unit economics are weak before ad spend. Improve gross profit structure first.",
      tone: "danger"
    };
  }

  if (args.breakEvenRoas !== null && args.breakEvenRoas > 3) {
    return {
      label: "ROAS target is strict",
      description: "Acquisition will require disciplined campaign efficiency to stay break-even.",
      tone: "warning"
    };
  }

  return {
    label: "Ad spend range looks healthy",
    description: "Break-even thresholds appear workable for controlled scaling.",
    tone: "success"
  };
}
