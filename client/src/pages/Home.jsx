import { useQuery } from "@tanstack/react-query";
import { apiGet } from "../api/http";

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["health"],
    queryFn: () => apiGet("/api/health"),
  });

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6">Error: {error.message}</div>;

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-semibold">Client</h1>
      <p className="mt-2 text-sm opacity-70">
        Calling backend via Vite proxy: <code>/api/health</code>
      </p>

      <pre className="mt-6 rounded-lg border p-4 text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
