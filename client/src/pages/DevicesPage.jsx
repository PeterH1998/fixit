import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { api } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function DevicesPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api("/api/devices")
      .then((res) => {
        const list = res.items || res.data || [];
        if (!cancelled) setItems(list);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          toast.error(err.message || "Failed to load devices");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((device) =>
      `${device.brand} ${device.model}`.toLowerCase().includes(q)
    );
  }, [items, query]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Devices"
        description="Manage customer devices and view details."
        actions={
          <Button variant="default" onClick={() => toast("Coming soon")}>
            New Device
          </Button>
        }
      />

      <Card className="shadow-sm">
        <CardContent className="py-4">
          <Input
            placeholder="Search devices..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </CardContent>
      </Card>

      {loading && <LoadingSkeleton rows={4} />}
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <EmptyState
          title="No devices found"
          description="Try adjusting your search or add a new device."
          action={
            <Button variant="outline" onClick={() => setQuery("")}>
              Clear search
            </Button>
          }
        />
      )}

      <div className="grid gap-4">
        {filtered.map((device) => (
          <Card
            key={device.id}
            className="cursor-pointer border-border transition hover:border-foreground/20 hover:shadow-md"
            onClick={() => navigate(`/repairs/${device.id}`)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                {device.brand} {device.model}
              </CardTitle>
              <CardDescription>Device ready for service</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">ID: {device.id}</span>
              <Button variant="ghost" size="sm">
                View repairs
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
