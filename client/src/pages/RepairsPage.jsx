import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function RepairsPage() {
  const { deviceId } = useParams();
  const navigate = useNavigate();
  const [repairs, setRepairs] = useState([]);
  const [deviceName, setDeviceName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    if (!deviceId) {
      setRepairs([]);
      setLoading(false);
      return () => {
        cancelled = true;
      };
    }

    api(`/api/repairs?deviceId=${deviceId}`)
      .then((res) => {
        const list = res.data || res.items || [];
        if (!cancelled) {
          setRepairs(list);
          const first = list[0]?.Device || list[0]?.device;
          if (first) {
            setDeviceName(`${first.brand} ${first.model}`);
          }
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          toast.error(err.message || "Failed to load repairs");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [deviceId]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Repairs"
        description={
          deviceName
            ? `Available services for ${deviceName}.`
            : "Track repair jobs and their status."
        }
        actions={
          <Button variant="outline" onClick={() => navigate("/devices")}>
            Back to Devices
          </Button>
        }
      />

      {loading && <LoadingSkeleton rows={3} />}
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {!loading && !error && !deviceId && (
        <EmptyState
          title="Choose a device first"
          description="Select a device to see repair options."
          action={
            <Button variant="outline" onClick={() => navigate("/devices")}>
              Browse devices
            </Button>
          }
        />
      )}

      {!loading && !error && deviceId && repairs.length === 0 && (
        <EmptyState
          title="No repairs found"
          description="No services are available for this device yet."
          action={
            <Button variant="outline" onClick={() => navigate("/devices")}>
              Pick another device
            </Button>
          }
        />
      )}

      <div className="space-y-4">
        {repairs.map((repair) => (
          <Card
            key={repair.id}
            className="cursor-pointer border-border transition hover:border-foreground/20 hover:shadow-md"
            onClick={() => navigate(`/book/${repair.id}`)}
          >
            <CardHeader className="pb-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <CardTitle>{repair.name}</CardTitle>
                <span className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                  Ready
                </span>
              </div>
              <CardDescription>{repair.durationMinutes} min</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Service ID: {repair.id}</span>
              <span className="font-medium">
                {repair.priceEUR != null || repair.price != null
                  ? `${repair.priceEUR ?? repair.price} ${repair.currency || "EUR"}`
                  : "N/A"}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
