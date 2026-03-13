import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FAQItem } from "@/types/tools";

interface FAQSectionProps {
  items: FAQItem[];
}

export function FAQSection({ items }: FAQSectionProps) {
  return (
    <div className="rounded-2xl border bg-card p-4 sm:p-6">
      <Accordion type="single" collapsible className="divide-y">
        {items.map((item, index) => (
          <AccordionItem key={item.question} value={`faq-${index}`} className="border-b-0">
            <AccordionTrigger className="py-4 text-base font-medium">{item.question}</AccordionTrigger>
            <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
