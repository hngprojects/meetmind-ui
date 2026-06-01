"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api";
import type {
  Question,
  RubricCriterion,
  SessionDTO,
} from "@/lib/call/interview-types";

const emptyQuestion = (): Question => ({
  text: "",
  followUpHint: "",
  maxFollowUps: 2,
});
const emptyCriterion = (): RubricCriterion => ({
  name: "",
  description: "",
  weight: 1,
});

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {hint && <p className="text-muted-foreground text-xs">{hint}</p>}
    </div>
  );
}

export function SessionForm({ initial }: { initial?: SessionDTO }) {
  const router = useRouter();
  const editing = Boolean(initial);

  const [role, setRole] = useState(initial?.role ?? "");
  const [candidateName, setCandidateName] = useState(
    initial?.candidateName ?? "",
  );
  const [intro, setIntro] = useState(
    initial?.intro ?? "an automated first-round screening interview",
  );
  const [durationMinutes, setDurationMinutes] = useState(
    initial?.durationMinutes ?? 20,
  );
  const [closing, setClosing] = useState(
    initial?.closing ??
      "Thanks for your time. A recruiter will follow up with next steps.",
  );
  const [questions, setQuestions] = useState<Question[]>(
    initial?.questions?.length ? initial.questions : [emptyQuestion()],
  );
  const [rubric, setRubric] = useState<RubricCriterion[]>(
    initial?.rubric?.length ? initial.rubric : [emptyCriterion()],
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const patchQuestion = (i: number, patch: Partial<Question>) =>
    setQuestions((qs) =>
      qs.map((q, idx) => (idx === i ? { ...q, ...patch } : q)),
    );
  const patchCriterion = (i: number, patch: Partial<RubricCriterion>) =>
    setRubric((cs) => cs.map((c, idx) => (idx === i ? { ...c, ...patch } : c)));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const payload = {
      role,
      // Backend expects a nested candidate object, not a flat candidateName field
      candidate: {
        name: candidateName,
      },
      intro,
      durationMinutes,
      closing,
      questions: questions.filter((q) => q.text.trim()),
      rubric: rubric.filter((c) => c.name.trim()),
    };

    try {
      const response = editing
        ? await api.patch(`/api/v1/interviews/${initial!.id}`, payload)
        : await api.post(`/api/v1/interviews`, payload);

      const session = response.data as SessionDTO;
      // Redirect to the interview route instead of sessions
      router.push(`/call/interview/${session.id}`);
      router.refresh();
    } catch (error) {
      const axiosError = error as { response?: { data?: unknown } };
      const errorData = axiosError.response?.data;

      const extractString = (value: unknown): string | undefined =>
        typeof value === "string" ? value : undefined;

      const dataObject =
        typeof errorData === "object" && errorData !== null
          ? (errorData as Record<string, unknown>)
          : {};

      const errorPayload =
        typeof dataObject.error === "object" && dataObject.error !== null
          ? (dataObject.error as Record<string, unknown>)
          : {};

      const message =
        extractString(dataObject.error) ||
        extractString(errorPayload.details) ||
        extractString(errorPayload.message) ||
        extractString(dataObject.message) ||
        "Save failed";

      setError(message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      {error && (
        <p className="border-destructive/40 bg-destructive/10 text-destructive rounded-md border px-3 py-2 text-sm">
          {error}
        </p>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Basics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Role">
              <Input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Backend Engineer"
                required
              />
            </Field>
            <Field label="Candidate name" hint="Optional">
              <Input
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder="Jane Doe"
              />
            </Field>
          </div>
          <Field
            label="Interview framing"
            hint='Completes: "You are conducting ___"'
          >
            <Input
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              required
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Duration (minutes)">
              <Input
                type="number"
                min={1}
                max={120}
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                required
              />
            </Field>
            <Field label="Closing line">
              <Input
                value={closing}
                onChange={(e) => setClosing(e.target.value)}
              />
            </Field>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Questions</CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setQuestions((qs) => [...qs, emptyQuestion()])}
          >
            <Plus /> Add question
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {questions.map((q, i) => (
            <div
              key={i}
              className="bg-muted/30 space-y-2 rounded-lg border p-3"
            >
              <div className="flex items-start gap-2">
                <span className="text-muted-foreground mt-2 text-xs font-medium">
                  {i + 1}
                </span>
                <Textarea
                  rows={2}
                  value={q.text}
                  onChange={(e) => patchQuestion(i, { text: e.target.value })}
                  placeholder="Question text"
                />
                {questions.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() =>
                      setQuestions((qs) => qs.filter((_, idx) => idx !== i))
                    }
                  >
                    <Trash2 className="text-muted-foreground" />
                  </Button>
                )}
              </div>
              <div className="grid gap-2 pl-5 sm:grid-cols-[1fr_150px]">
                <Input
                  value={q.followUpHint}
                  onChange={(e) =>
                    patchQuestion(i, { followUpHint: e.target.value })
                  }
                  placeholder="Follow-up guidance for the AI"
                />
                <Input
                  type="number"
                  min={0}
                  max={5}
                  value={q.maxFollowUps}
                  onChange={(e) =>
                    patchQuestion(i, { maxFollowUps: Number(e.target.value) })
                  }
                  placeholder="Max follow-ups"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Scoring rubric</CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setRubric((cs) => [...cs, emptyCriterion()])}
          >
            <Plus /> Add criterion
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {rubric.map((c, i) => (
            <div
              key={i}
              className="bg-muted/30 grid gap-2 rounded-lg border p-3 sm:grid-cols-[180px_1fr_90px_auto]"
            >
              <Input
                value={c.name}
                onChange={(e) => patchCriterion(i, { name: e.target.value })}
                placeholder="Criterion"
              />
              <Input
                value={c.description}
                onChange={(e) =>
                  patchCriterion(i, { description: e.target.value })
                }
                placeholder="What it measures"
              />
              <Input
                type="number"
                min={1}
                max={5}
                value={c.weight}
                onChange={(e) =>
                  patchCriterion(i, { weight: Number(e.target.value) })
                }
                placeholder="Weight"
              />
              {rubric.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() =>
                    setRubric((cs) => cs.filter((_, idx) => idx !== i))
                  }
                >
                  <Trash2 className="text-muted-foreground" />
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : editing ? "Save changes" : "Create interview"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
