import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";

const STORAGE_KEY = "fixit_booking";

const emailPattern = /^\S+@\S+\.\S+$/;

export default function BookStep2Page() {
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) {
      navigate("/book", { replace: true });
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      if (
        !parsed?.deviceType ||
        !parsed?.serviceType ||
        !parsed?.preferredDate ||
        !parsed?.preferredTime
      ) {
        sessionStorage.removeItem(STORAGE_KEY);
        navigate("/book", { replace: true });
        return;
      }
      setBooking(parsed);
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
      navigate("/book", { replace: true });
    }
  }, [navigate]);

  const startAt = useMemo(() => {
    if (!booking?.preferredDate || !booking?.preferredTime) return "";
    return new Date(
      `${booking.preferredDate}T${booking.preferredTime}:00`
    ).toISOString();
  }, [booking]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!booking) {
      toast.error("Booking details are missing. Please start again.");
      navigate("/book", { replace: true });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...booking,
        name: name.trim(),
        email: email.trim(),
      };

      // TODO: If backend expects a different schema (e.g. repairServiceId/startAt),
      // map these fields before sending.
      await api("/api/bookings", {
        method: "POST",
        body: {
          ...payload,
          startAt,
        },
      });

      sessionStorage.removeItem(STORAGE_KEY);
      toast.success("Booking confirmed. We'll see you soon!");
      navigate("/", { replace: true });
    } catch (err) {
      const message =
        err?.message || "Something went wrong. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!booking) {
    return null;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Step 2 of 2</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Confirm your booking
        </h1>
        <p className="text-sm text-muted-foreground">
          Add your contact details and we will lock in your time.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your details</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                />
              </div>

              {error ? (
                <p className="text-sm text-destructive">{error}</p>
              ) : null}

              <div className="flex flex-wrap items-center justify-between gap-3">
                <Button asChild variant="ghost">
                  <Link to="/book">Back</Link>
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Confirm booking"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-lg">Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div>
              <span className="text-foreground">Device:</span>{" "}
              {booking.deviceType}
            </div>
            <div>
              <span className="text-foreground">Service:</span>{" "}
              {booking.serviceType}
            </div>
            <div>
              <span className="text-foreground">Date:</span>{" "}
              {booking.preferredDate}
            </div>
            <div>
              <span className="text-foreground">Time:</span>{" "}
              {booking.preferredTime}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
