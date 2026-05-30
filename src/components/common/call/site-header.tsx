import Link from "next/link";
import { Bot } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <Bot className="size-5" />
          AI Interviewer
        </Link>
        <nav className="text-muted-foreground flex items-center gap-1 text-sm">
          <Link
            href="/"
            className="hover:text-foreground rounded-md px-3 py-1.5 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/"
            className="hover:text-foreground rounded-md px-3 py-1.5 transition-colors"
          >
            Interviews
          </Link>
          <Link
            href="/about"
            className="hover:text-foreground rounded-md px-3 py-1.5 transition-colors"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
