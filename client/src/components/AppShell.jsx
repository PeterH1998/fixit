import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navClass = ({ isActive }) =>
  [
    "text-sm font-medium transition-colors",
    isActive ? "text-foreground" : "text-muted-foreground",
  ].join(" ");

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 md:px-6">
          <div className="text-lg font-semibold tracking-tight">FixIt</div>
          <nav className="flex flex-wrap items-center gap-2">
            <Button asChild variant="ghost" className="h-9 px-3">
              <NavLink to="/devices" className={navClass}>
                Devices
              </NavLink>
            </Button>
            <Button asChild variant="ghost" className="h-9 px-3">
              <NavLink to="/repairs" className={navClass}>
                Repairs
              </NavLink>
            </Button>
            <Button asChild variant="ghost" className="h-9 px-3">
              <NavLink to="/book" className={navClass}>
                Book
              </NavLink>
            </Button>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-8">
        {children}
      </main>
    </div>
  );
}
