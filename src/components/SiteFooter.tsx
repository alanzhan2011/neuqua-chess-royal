import { Link } from "@tanstack/react-router";
import { navLinks } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-border bg-background py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Link to="/" className="font-display text-lg font-bold tracking-tight text-foreground">
            Neuqua Valley <span className="text-navy">Chess</span>
          </Link>
          <p className="mt-1 text-sm text-muted-foreground">
            Room D200, Neuqua Valley High School · since 1996 · © {new Date().getFullYear()}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>

  );
}
