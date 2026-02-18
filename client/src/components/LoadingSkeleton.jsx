export default function LoadingSkeleton({ rows = 3 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl border border-border bg-background p-6 shadow-sm"
        >
          <div className="space-y-3">
            <div className="h-4 w-1/3 animate-pulse rounded-md bg-muted" />
            <div className="h-3 w-2/3 animate-pulse rounded-md bg-muted" />
            <div className="h-3 w-1/2 animate-pulse rounded-md bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
