import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SessionForm } from "@/components/common/call/session-form";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function EditSessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let session = null;
  try {
    const API_BASE =
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://api.staging.meetmind.hng14.com";
    const res = await fetch(`${API_BASE}/api/v1/interviews/${id}`, {
      cache: "no-store",
    });
    if (res.ok) {
      session = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch session for edit:", error);
  }

  if (!session) notFound();

  return (
    <main className="bg-background text-foreground min-h-svh">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <Button asChild variant="ghost" size="sm" className="mb-2 -ml-2">
          <Link href={`/sessions/${id}`}>
            <ArrowLeft /> Back to interview
          </Link>
        </Button>
        <h1 className="mb-6 text-2xl font-semibold tracking-tight">
          Edit interview
        </h1>
        {session.status === "created" ? (
          <SessionForm initial={session} />
        ) : (
          <p className="rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-700 dark:text-amber-400">
            This interview has already started — its configuration is locked.
          </p>
        )}
      </div>
    </main>
  );
}
