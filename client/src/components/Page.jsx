export default function Page({ title, subtitle, children, actions }) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-neutral-900" />
            <span className="text-sm font-semibold tracking-tight">FixIt</span>
          </div>
          <div className="flex items-center gap-2">{actions}</div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-8">
          {title ? (
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
              {title}
            </h1>
          ) : null}
          {subtitle ? (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
              {subtitle}
            </p>
          ) : null}
        </div>

        {children}
      </main>
    </div>
  );
}
