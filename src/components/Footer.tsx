import Link from "next/link";
import { Zap, Globe, Mail, ExternalLink, Code } from "lucide-react";


const QUICK_LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#shortlist", label: "Find My Car" },
  { href: "#popular", label: "Popular" },
  { href: "/cars", label: "Browse All Cars" },
  { href: "#contact", label: "Contact" },
];

const SOCIAL = [
  { href: "https://x.com", icon: ExternalLink, label: "X" },
  { href: "https://linkedin.com", icon: Globe, label: "LinkedIn" },
  { href: "mailto:hello@carguru.in", icon: Mail, label: "Email" },
  { href: "https://github.com", icon: Code, label: "GitHub" },
];


export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-card/30 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" id="footer-logo" className="inline-flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">
                Car<span className="gradient-text">Guru</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              India&apos;s smartest AI car research platform. Go from confused to confident in minutes.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              {SOCIAL.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`footer-social-${label.toLowerCase()}`}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    id={`footer-link-${label.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              About
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>Built for CarDekho Group — a Take-Home Assignment showcasing AI-native product thinking.</p>
              <p className="text-xs">
                Dataset: 35 real Indian market cars · Powered by a custom weighted recommendation engine.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} CarGuru. Built with ❤️ for car buyers everywhere.</p>
          <p>Next.js · TypeScript · PostgreSQL · Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
