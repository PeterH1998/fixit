import MarketingHero from "@/components/MarketingHero";
import DeviceCard from "@/components/DeviceCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const deviceCards = [
  {
    title: "iPhone",
    description: "Crisp displays, fast face ID fixes, and premium parts.",
    repairs: ["Screen repair", "Battery replacement", "Camera issues"],
    deviceType: "iphone",
  },
  {
    title: "Galaxy",
    description: "OLED care with precision sealing and same-day service.",
    repairs: ["Screen repair", "Charging port", "Speaker repair"],
    deviceType: "galaxy",
  },
  {
    title: "Pixel",
    description: "Trusted diagnostics with clean component swaps.",
    repairs: ["Battery swap", "Diagnostics", "Water damage triage"],
    deviceType: "pixel",
  },
];

const serviceCards = [
  {
    title: "Screen Repair",
    copy: "High-quality panels, calibrated color, and strong seals.",
  },
  {
    title: "Battery Replacement",
    copy: "Restore all-day power with safe, tested batteries.",
  },
  {
    title: "Charging Port",
    copy: "Clear debris, replace ports, and stabilize connections.",
  },
  {
    title: "Diagnostics",
    copy: "Quick checks to pinpoint hardware or software issues.",
  },
];

export default function LandingPage() {
  return (
    <div className="space-y-16 pb-6">
      <MarketingHero />

      <section className="grid gap-4 rounded-2xl border border-border bg-muted/40 p-6 md:grid-cols-3">
        <div className="space-y-1">
          <p className="text-sm font-medium">Same-day repairs</p>
          <p className="text-xs text-muted-foreground">
            Most fixes completed in under 2 hours.
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">Warranty included</p>
          <p className="text-xs text-muted-foreground">
            90-day coverage on parts and labor.
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">Upfront pricing</p>
          <p className="text-xs text-muted-foreground">
            No surprises. We confirm every quote.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            Devices we fix
          </h2>
          <p className="text-sm text-muted-foreground">
            Choose your device to get started.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {deviceCards.map((device) => (
            <DeviceCard key={device.title} {...device} />
          ))}
        </div>
      </section>

      <section id="services" className="space-y-6 scroll-mt-24">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            Popular services
          </h2>
          <p className="text-sm text-muted-foreground">
            Professional repairs, premium parts, and fast turnaround.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {serviceCards.map((service) => (
            <Card key={service.title}>
              <CardHeader>
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {service.copy}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <footer className="grid gap-6 border-t border-border pt-10 text-sm text-muted-foreground md:grid-cols-3">
        <div>
          <p className="font-medium text-foreground">FixIt</p>
          <p>Fast, reliable phone repairs.</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Hours</p>
          <p>Mon-Fri: 9am-7pm</p>
          <p>Sat: 10am-5pm</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Contact</p>
          <p>123 Repair Ave, Your City</p>
          <p>support@fixit.example</p>
          <p>(555) 555-0199</p>
        </div>
      </footer>
    </div>
  );
}
