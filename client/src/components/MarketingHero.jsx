import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function MarketingHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border bg-card">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-gradient-to-br from-sky-200 via-blue-200 to-transparent opacity-70 blur-3xl animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-gradient-to-br from-emerald-200 via-teal-200 to-transparent opacity-60 blur-3xl animate-[float_10s_ease-in-out_infinite]" />
      </div>

      <div className="relative px-6 py-12 md:px-10 md:py-16">
        <div className="max-w-2xl space-y-5">
          <p className="inline-flex items-center rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground">
            Same-day service. Certified technicians.
          </p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Fast, reliable phone repairs.
          </h1>
          <p className="text-lg text-muted-foreground">
            iPhone, Galaxy, Pixel done same day. Transparent pricing, premium
            parts, and a warranty you can trust.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/book">Book appointment</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#services">View services</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
