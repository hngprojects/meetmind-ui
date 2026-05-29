import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CopyField } from "@/components/common/call/copy-field";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type {
  Report,
  SessionStatus,
  TranscriptTurn,
} from "@/lib/call/interview-types";

export const dynamic = "force-dynamic";

// Fixed: Maps variants to standard Shadcn types
const statusVariant: Record<
  SessionStatus,
  "secondary" | "outline" | "default"
> = {
  created: "secondary",
  in_progress: "outline", // Maps warning state
  completed: "default", // Maps success state
};

// Fixed: Maps variants to standard Shadcn types
const overallVariant: Record<string, "default" | "destructive"> = {
  strong_yes: "default", // Maps success state
  yes: "default", // Maps success state
  no: "destructive",
  strong_no: "destructive",
};

export default async function SessionDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let s = null;
  try {
    const res = await fetch(
      `https://api.staging.meetmind.hng14.com/api/v1/sessions/${id}`,
      {
        cache: "no-store",
      },
    );
    if (res.ok) {
      s = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch session detail from backend:", error);
  }

  if (!s) notFound();

  const sess = s as {
    status: SessionStatus;
    id: string;
    role: string;
    candidateName?: string | null;
    durationMinutes: number;
    report?: Report | null;
    transcript?: TranscriptTurn[] | null;
  };

  return (
    <main className="bg-background text-foreground min-h-svh">
      <div className="mx-auto max-w-3xl space-y-6 px-6 py-10">
        <Button asChild variant="ghost" size="sm" className="-ml-2">
          <Link href="/">
            <ArrowLeft /> All interviews
          </Link>
        </Button>

        <header className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {sess.role}
            </h1>
            <p className="text-muted-foreground text-sm">
              {sess.candidateName ?? "No candidate name"} ·{" "}
              {sess.durationMinutes} min
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={statusVariant[sess.status]}>
              {sess.status.replace("_", " ")}
            </Badge>
            {sess.status === "created" && (
              <Button asChild variant="outline" size="sm">
                <Link href={`/sessions/${sess.id}/edit`}>Edit</Link>
              </Button>
            )}
          </div>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Candidate link</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <CopyField path={`/call/interview/${sess.id}`} />
            <p className="text-muted-foreground text-xs">
              Send this to the candidate. The AI interviewer joins when they
              open it.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI report</CardTitle>
          </CardHeader>
          <CardContent>
            {sess.report ? (
              <ReportView report={sess.report} />
            ) : (
              <Empty>
                No report yet — generated automatically when the interview ends.
              </Empty>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transcript</CardTitle>
          </CardHeader>
          <CardContent>
            {sess.transcript && sess.transcript.length > 0 ? (
              <TranscriptView turns={sess.transcript} />
            ) : (
              <Empty>No transcript yet.</Empty>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

// Rest of the helper components (Empty, ReportView, TranscriptView) remain completely unchanged...
function Empty({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-muted-foreground rounded-md border border-dashed p-4 text-sm">
      {children}
    </p>
  );
}

function ReportView({ report }: { report: Report }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-sm">Recommendation</span>
        <Badge variant={overallVariant[report.overall] ?? "secondary"}>
          {report.overall.replace("_", " ")}
        </Badge>
      </div>
      <p className="text-sm">{report.summary}</p>
      <div className="divide-y">
        {report.criteria.map((c, i) => (
          <div key={i} className="flex gap-3 py-2">
            <span className="w-12 shrink-0 text-lg font-semibold tabular-nums">
              {c.score}
              <span className="text-muted-foreground text-xs">/5</span>
            </span>
            <div>
              <p className="text-sm font-medium">{c.name}</p>
              <p className="text-muted-foreground text-sm">{c.justification}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TranscriptView({ turns }: { turns: TranscriptTurn[] }) {
  return (
    <div className="space-y-3">
      {turns.map((t, i) => (
        <div key={i}>
          <p
            className={`text-xs font-semibold tracking-wide uppercase ${
              t.speaker === "candidate"
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            {t.speaker}
          </p>
          <p className="text-sm">{t.text}</p>
        </div>
      ))}
    </div>
  );
}
