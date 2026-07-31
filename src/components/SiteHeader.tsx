import { Link } from "@tanstack/react-router";

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Meetings", to: "/meetings" },
  { label: "About", to: "/about" },
  { label: "Join", to: "/join" },
] as const;

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-surface shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="font-display text-xl font-bold tracking-tight text-navy-deep">
          Neuqua Valley <span className="text-navy">Chess</span>
        </Link>
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden items-center gap-6 sm:flex">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                activeProps={{ className: "text-navy font-semibold" }}
                inactiveProps={{ className: "text-navy-deep/70" }}
                className="text-sm transition-colors hover:text-navy"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            to="/join"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Join Us
          </Link>
        </div>
      </nav>
    </header>
  );
}
