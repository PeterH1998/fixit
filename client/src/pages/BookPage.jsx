import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";

export default function BookPage() {
  const { repairServiceId } = useParams();
  const navigate = useNavigate();
  const [repair, setRepair] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [startAt, setStartAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  const isoStartAt = useMemo(() => {
    if (!startAt) return "";
    const date = new Date(startAt);
    if (Number.isNaN(date.getTime())) return "";
    return date.toISOString();
  }, [startAt]);

  useEffect(() => {
    let cancelled = false;
    if (!repairServiceId) return () => {};
    api(`/api/repairs/${repairServiceId}`)
      .then((res) => {
        if (!cancelled) {
          setRepair(res.data || res);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          toast.error(err.message || "Failed to load repair");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [repairServiceId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess(null);
    setLoading(true);
    try {
      if (!email || !password || !isoStartAt) {
        setError("Please complete all fields");
        toast.error("Please complete all fields");
        return;
      }
      const loginRes = await api("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });

      const token = loginRes?.data?.token;
      if (token) {
        localStorage.setItem("token", token);
      }

      const bookingRes = await api("/api/bookings", {
        method: "POST",
        body: { repairServiceId, startAt: isoStartAt },
        token,
      });

      setSuccess(bookingRes.data || bookingRes);
      toast.success("Booking confirmed");
    } catch (err) {
      if (err.status === 401) {
        setError("Login required");
        toast.error("Login required");
      } else if (err.status === 409) {
        setError("Slot unavailable");
        toast.error("Slot unavailable");
      } else {
        setError(err.message || "Booking failed");
        toast.error(err.message || "Booking failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Book a Repair"
        description="Sign in and confirm your appointment."
        actions={
          <Button variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
        }
      />

      {!repairServiceId && (
        <EmptyState
          title="Select a repair first"
          description="Pick a repair service before booking."
          action={
            <Button variant="outline" onClick={() => navigate("/devices")}>
              Browse devices
            </Button>
          }
        />
      )}

      {repairServiceId && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Sign in</CardTitle>
              <CardDescription>
                Use your account to complete the booking.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4" onSubmit={handleSubmit}>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? "Signing in..." : "Continue"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>{repair?.name || "Repair Service"}</CardTitle>
              <CardDescription>
                {repair?.durationMinutes ? `${repair.durationMinutes} min` : ""}
                {(repair?.priceEUR != null || repair?.price != null) &&
                  ` | ${repair?.priceEUR ?? repair?.price} ${
                    repair?.currency || "EUR"
                  }`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
                  {error}
                </div>
              )}
              {success && (
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-700">
                  Booking confirmed.
                  <div className="mt-2 text-xs text-emerald-700/80">
                    Start: {success.startAt}
                  </div>
                  <div className="text-xs text-emerald-700/80">
                    End: {success.endAt}
                  </div>
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="datetime">Appointment Time</Label>
                <Input
                  id="datetime"
                  type="datetime-local"
                  value={startAt}
                  onChange={(event) => setStartAt(event.target.value)}
                  required
                />
                {isoStartAt && (
                  <span className="text-xs text-muted-foreground">
                    UTC: {isoStartAt}
                  </span>
                )}
              </div>

              <Button
                type="button"
                onClick={handleSubmit}
                disabled={loading || !isoStartAt}
              >
                {loading ? "Booking..." : "Confirm Booking"}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
