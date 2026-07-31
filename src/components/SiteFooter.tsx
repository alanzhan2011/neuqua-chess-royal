import { Link } from "@tanstack/react-router";
import { navLinks } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-border bg-background py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <Link to="/" className="font-display text-lg font-bold tracking-tight text-foreground">
          Neuqua Valley <span className="text-accent">Chess</span>
        </Link>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Neuqua Valley Chess Club. Celebrating 30 years.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
