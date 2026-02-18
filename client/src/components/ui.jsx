export function Card({ children, className = "" }) {
  return (
    <div className={"rounded-2xl border border-neutral-200 bg-white shadow-sm " + className}>
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, className = "" }) {
  return (
    <div className={"border-b border-neutral-100 px-6 py-5 " + className}>
      <div className="text-sm font-semibold text-neutral-900">{title}</div>
      {subtitle ? <div className="mt-1 text-sm text-neutral-600">{subtitle}</div> : null}
    </div>
  );
}

export function CardBody({ children, className = "" }) {
  return <div className={"px-6 py-5 " + className}>{children}</div>;
}

export function Button({ children, className = "", variant = "primary", ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-neutral-900/20 disabled:opacity-50 disabled:cursor-not-allowed";
  const styles =
    variant === "primary"
      ? "bg-neutral-900 text-white hover:bg-neutral-800"
      : variant === "secondary"
      ? "bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-50"
      : "text-neutral-700 hover:bg-neutral-100";

  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function Input({ className = "", ...props }) {
  return (
    <input
      className={
        "w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/20 " +
        className
      }
      {...props}
    />
  );
}

export function Label({ children }) {
  return <label className="text-xs font-medium text-neutral-700">{children}</label>;
}

export function Alert({ children, tone = "info" }) {
  const styles =
    tone === "error"
      ? "border-red-200 bg-red-50 text-red-800"
      : tone === "success"
      ? "border-green-200 bg-green-50 text-green-800"
      : "border-neutral-200 bg-neutral-50 text-neutral-800";
  return <div className={`rounded-xl border px-4 py-3 text-sm ${styles}`}>{children}</div>;
}
