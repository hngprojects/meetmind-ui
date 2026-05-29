import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SessionForm } from "@/components/common/call/session-form";
import { Button } from "@/components/ui/button";

export default function NewSessionPage() {
  return (
    <main className="bg-background text-foreground min-h-svh">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <Button asChild variant="ghost" size="sm" className="mb-2 -ml-2">
          <Link href="/call">
            <ArrowLeft /> All interviews
          </Link>
        </Button>
        <h1 className="mb-6 text-2xl font-semibold tracking-tight">
          New interview
        </h1>
        <SessionForm />
      </div>
    </main>
  );
}
