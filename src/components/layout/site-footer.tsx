import Link from "next/link";

const categoryLinks = [
  { href: "/tools", label: "Tools directory" },
  { href: "/import-cost-tools", label: "Import cost" },
  { href: "/profit-margin-tools", label: "Profit & margin" },
  { href: "/inventory-planning-tools", label: "Inventory planning" },
  { href: "/marketplace-seller-tools", label: "Marketplace" }
];

const popularTools = [
  { href: "/tools/landed-cost-calculator-importers", label: "Landed Cost" },
  { href: "/tools/import-profit-margin-calculator", label: "Import Profit Margin" },
  { href: "/tools/reorder-point-calculator-lead-time", label: "Reorder Point" }
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" }
];

export function SiteFooter() {
  return (
    <footer className="mt-14 border-t bg-white/70 backdrop-blur">
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr_0.9fr]">
          <div>
            <p className="text-base font-semibold">MarginKit</p>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Built for importers, resellers, and e-commerce teams who need faster pricing and inventory decisions.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Questions or feedback? Reach out at <Link href="mailto:hello@marginkit.app" className="text-primary">hello@marginkit.app</Link>
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold">Categories</p>
            <nav className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
              {categoryLinks.map((link) => (
                <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-sm font-semibold">Top calculators</p>
            <nav className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
              {popularTools.map((tool) => (
                <Link key={tool.href} href={tool.href} className="transition-colors hover:text-foreground">
                  {tool.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-sm font-semibold">Company</p>
            <nav className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
              {companyLinks.map((link) => (
                <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-8 border-t pt-4 text-xs text-muted-foreground">
          (c) {new Date().getFullYear()} MarginKit. Fast calculations, clearer decisions, practical workflows.
        </div>
      </div>
    </footer>
  );
}
