import Link from "next/link";
import { Plus } from "lucide-react";
// import { SiteHeader } from "@/components/common/call/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { SessionDTO, SessionStatus } from "@/lib/call/interview-types";
import Dashboardnavbar from "@/components/common/dash/dashnav/dashboardnavbar";

export const dynamic = "force-dynamic";

const statusVariant: Record<
  SessionStatus,
  "secondary" | "default" | "outline"
> = {
  created: "secondary",
  in_progress: "outline",
  completed: "default",
};

export default async function Dashboard() {
  let sessions: SessionDTO[] = [];
  try {
    const API_BASE =
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://api.staging.meetmind.hng14.com";
    const res = await fetch(`${API_BASE}/api/v1/interviews/`, {
      cache: "no-store",
    });
    if (res.ok) {
      sessions = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch sessions from backend:", error);
  }

  return (
    <main className="bg-background text-foreground min-h-svh">
      {/* <SiteHeader /> */}

      <Dashboardnavbar />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Interviews</h1>
          <Button asChild>
            <Link href="/call/sessions/new">
              <Plus /> New interview
            </Link>
          </Button>
        </header>

        {sessions.length === 0 ? (
          <Card className="items-center gap-3 border-dashed py-12 text-center">
            <p className="text-muted-foreground text-sm">No interviews yet.</p>
            <Button asChild variant="outline" size="sm">
              <Link href="/call/sessions/new">Create your first interview</Link>
            </Button>
          </Card>
        ) : (
          <div className="space-y-2">
            {sessions.map((s) => (
              <Link
                key={s.id}
                href={`/call/sessions/${s.id}`}
                className="block"
              >
                <Card className="hover:border-foreground/30 flex-row items-center justify-between gap-4 px-5 py-4 transition-colors">
                  <div>
                    <p className="font-medium">{s.role}</p>
                    <p className="text-muted-foreground text-xs">
                      {s.candidateName ?? "No candidate name"} ·{" "}
                      {s.durationMinutes} min ·{" "}
                      {new Date(s.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant={statusVariant[s.status]}>
                    {s.status.replace("_", " ")}
                  </Badge>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
