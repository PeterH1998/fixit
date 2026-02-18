import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const deviceOptions = [
  { label: "iPhone", value: "iphone" },
  { label: "Galaxy", value: "galaxy" },
  { label: "Pixel", value: "pixel" },
];

const serviceOptions = [
  "Screen Repair",
  "Battery Replacement",
  "Charging Port",
  "Diagnostics",
];

const STORAGE_KEY = "fixit_booking";

const normalizeDevice = (value) =>
  deviceOptions.find((device) => device.value === value)?.value || "";

const normalizeService = (value) =>
  serviceOptions.find((service) => service.toLowerCase() === value?.toLowerCase()) ||
  "";

export default function BookStep1Page() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { repairServiceId } = useParams();

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const [deviceType, setDeviceType] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setDeviceType(normalizeDevice(parsed.deviceType));
        setServiceType(parsed.serviceType || "");
        setPreferredDate(parsed.preferredDate || "");
        setPreferredTime(parsed.preferredTime || "");
        return;
      } catch {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    }

    const deviceParam = normalizeDevice(searchParams.get("device"));
    if (deviceParam) {
      setDeviceType(deviceParam);
    }

    if (repairServiceId) {
      const normalizedService = normalizeService(
        repairServiceId.replace(/[-_]/g, " ")
      );
      if (normalizedService) {
        setServiceType(normalizedService);
      }
    }
  }, [repairServiceId, searchParams]);

  const handleContinue = (event) => {
    event.preventDefault();

    if (!deviceType || !serviceType || !preferredDate || !preferredTime) {
      toast.error("Please complete all fields to continue.");
      return;
    }

    const payload = {
      deviceType,
      serviceType,
      preferredDate,
      preferredTime,
    };

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    navigate("/book/details");
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Step 1 of 2</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Book an appointment
        </h1>
        <p className="text-sm text-muted-foreground">
          Pick your device, service, and preferred time.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Appointment details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleContinue}>
            <div className="space-y-2">
              <Label>Device type</Label>
              <div className="flex flex-wrap gap-2">
                {deviceOptions.map((device) => (
                  <Button
                    key={device.value}
                    type="button"
                    variant={deviceType === device.value ? "default" : "outline"}
                    onClick={() => setDeviceType(device.value)}
                  >
                    {device.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceType">Service type</Label>
              <select
                id="serviceType"
                value={serviceType}
                onChange={(event) => setServiceType(event.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="">Select a service</option>
                {serviceOptions.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="preferredDate">Preferred date</Label>
                <Input
                  id="preferredDate"
                  type="date"
                  min={today}
                  value={preferredDate}
                  onChange={(event) => setPreferredDate(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredTime">Preferred time</Label>
                <Input
                  id="preferredTime"
                  type="time"
                  value={preferredTime}
                  onChange={(event) => setPreferredTime(event.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <Button asChild variant="ghost">
                <Link to="/">Back to home</Link>
              </Button>
              <Button type="submit">Continue</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
