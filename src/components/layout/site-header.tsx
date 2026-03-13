import Link from "next/link";
import { Calculator, Grid3X3, PackageSearch } from "lucide-react";

import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/tools", label: "Tools" },
  { href: "/import-cost-tools", label: "Import cost" },
  { href: "/profit-margin-tools", label: "Profit & margin" },
  { href: "/inventory-planning-tools", label: "Inventory" },
  { href: "/marketplace-seller-tools", label: "Marketplace" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/92 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            <PackageSearch className="h-4 w-4" />
          </div>
          <span>MarginKit</span>
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href="/tools">
              <Grid3X3 className="mr-2 h-4 w-4" />
              Explore tools
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/tools/landed-cost-calculator-importers">
              <Calculator className="mr-2 h-4 w-4" />
              Use calculators
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
