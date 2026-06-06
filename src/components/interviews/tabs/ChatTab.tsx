"use client";

import type { ChatMessage } from "@/types/interview";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { HiOutlinePlus } from "react-icons/hi2";

// ─── Types ────────────────────────────────────────────────────────────────────

type AttachmentPreview = {
  id: string;
  file: File;
};

type Props = {
  messages: ChatMessage[];
  onSendMessage?: (content: string, attachments: File[]) => Promise<void>;
  onVoiceMessage?: (audioBlob: Blob) => Promise<string | undefined>;
  isSendingMessage?: boolean;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const ACCEPTED_FILE_TYPES =
  ".pdf,.docx,.txt,application/pdf,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const ALLOWED_DOCUMENT_EXTENSIONS = new Set(["pdf", "docx", "txt"]);
const MAX_DOCUMENT_SIZE_BYTES = 10 * 1024 * 1024;
const MAX_DOCUMENT_SIZE_LABEL = "10 MB";
const COPY_CHECKMARK_DURATION_MS = 2000;
const DOCUMENT_FORMAT_MESSAGE =
  "Only PDF, DOCX, and TXT documents are supported.";
const MICROPHONE_BLOCKED_MESSAGE =
  "Microphone access was not granted. Check Chrome site permissions and Windows microphone privacy settings, then reload and try again.";
const SEND_FAILURE_MESSAGE =
  "We could not send your message. Please try again.";
const VOICE_SUCCESS_MESSAGE = "Voice query sent.";

function getFileExtension(file: File): string {
  return file.name.split(".").pop()?.toLowerCase() ?? "";
}

function validateDocumentFile(file: File): string | null {
  const extension = getFileExtension(file);

  if (!ALLOWED_DOCUMENT_EXTENSIONS.has(extension)) {
    return DOCUMENT_FORMAT_MESSAGE;
  }

  if (file.size > MAX_DOCUMENT_SIZE_BYTES) {
    return `Documents must be ${MAX_DOCUMENT_SIZE_LABEL} or smaller.`;
  }

  return null;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CopyButton({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), COPY_CHECKMARK_DURATION_MS);
    } catch {
      const el = document.createElement("textarea");
      el.value = content;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), COPY_CHECKMARK_DURATION_MS);
    }
  }, [content]);

  return (
    <button
      type="button"
      aria-label={copied ? "Copied" : "Copy"}
      onClick={handleCopy}
      className="transition-opacity hover:opacity-70"
    >
      <span className="relative inline-block" style={{ width: 14, height: 14 }}>
        <span
          className="absolute inset-0 flex items-center justify-center transition-all duration-300"
          style={{
            opacity: copied ? 0 : 1,
            transform: copied ? "scale(0.7)" : "scale(1)",
          }}
        >
          <Image src="/icons/copy.svg" alt="" width={14} height={14} />
        </span>
        <span
          className="absolute inset-0 flex items-center justify-center text-[var(--color-text-success)] transition-all duration-300"
          style={{
            opacity: copied ? 1 : 0,
            transform: copied ? "scale(1)" : "scale(0.7)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 7L5.5 10.5L12 3.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>
    </button>
  );
}

function UserMessage({
  msg,
  canEdit,
  onUseAsDraft,
}: {
  msg: ChatMessage;
  canEdit: boolean;
  onUseAsDraft: (content: string) => void;
}) {
  return (
    <div className="flex flex-col items-end">
      <div className="max-w-lg rounded-2xl bg-[var(--color-scrollbar-track)] px-5 py-3 text-sm text-[var(--color-text-color-primary)]">
        {msg.content}
      </div>
      <div className="mt-2 flex justify-end gap-3 text-[var(--color-card-text)]">
        <CopyButton content={msg.content} />
        {canEdit && (
          <button
            type="button"
            aria-label="Edit last message"
            onClick={() => onUseAsDraft(msg.content)}
            className="transition-opacity hover:opacity-70"
            title="Edit last message as a new query"
          >
            <Image src="/icons/pencil.svg" alt="Edit" width={13} height={13} />
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Voice recording hook ─────────────────────────────────────────────────────

type RecordingState = "idle" | "recording" | "transcribing";

function isLocalhost(): boolean {
  return ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null &&
    "data" in error.response &&
    typeof error.response.data === "object" &&
    error.response.data !== null
  ) {
    const data = error.response.data as {
      message?: string;
      detail?: string;
      error?: string;
    };
    const message = data.message ?? data.detail ?? data.error;
    if (message?.trim()) return message;
  }

  if (error instanceof Error && error.message.trim()) return error.message;
  return fallback;
}

function getMicrophoneErrorMessage(error: unknown): string {
  if (!(error instanceof DOMException)) {
    return "We could not start voice input. Please try again.";
  }

  switch (error.name) {
    case "NotAllowedError":
    case "SecurityError":
      return MICROPHONE_BLOCKED_MESSAGE;
    case "NotFoundError":
      return "No microphone was found on this device.";
    case "NotReadableError":
      return "Your microphone is already in use by another app.";
    case "AbortError":
      return "Microphone setup was interrupted. Please try again.";
    default:
      return "We could not start voice input. Please try again.";
  }
}

function useVoiceRecorder(
  onTranscript: (text: string) => void,
  transcribeAudio?: (audioBlob: Blob) => Promise<string | undefined>,
) {
  const [state, setState] = useState<RecordingState>("idle");
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const start = useCallback(async () => {
    setError(null);

    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Voice input is not supported in this browser.");
      return;
    }

    if (typeof MediaRecorder === "undefined") {
      setError("Voice recording is not supported in this browser.");
      return;
    }

    if (!window.isSecureContext && !isLocalhost()) {
      setError("Microphone access requires HTTPS or localhost.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "";
      const recorder = new MediaRecorder(
        stream,
        mimeType ? { mimeType } : undefined,
      );
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, {
          type: mimeType || "audio/webm",
        });

        if (!transcribeAudio) {
          setError("Voice input is not connected yet.");
          setState("idle");
          return;
        }

        setState("transcribing");
        try {
          const text = await transcribeAudio(blob);
          onTranscript(text?.trim() || VOICE_SUCCESS_MESSAGE);
        } catch (transcriptionError) {
          setError(
            getErrorMessage(
              transcriptionError,
              "We could not send your voice query. Please try again.",
            ),
          );
        } finally {
          setState("idle");
        }
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setState("recording");
    } catch (recordingError) {
      setState("idle");
      setError(getMicrophoneErrorMessage(recordingError));
    }
  }, [onTranscript, transcribeAudio]);

  const stop = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
    mediaRecorderRef.current = null;
  }, []);

  const toggle = useCallback(() => {
    setError(null);
    if (state === "idle") void start();
    else if (state === "recording") stop();
  }, [state, start, stop]);

  const clearError = useCallback(() => setError(null), []);

  return { state, error, toggle, clearError };
}

// ==================== 🧩Main Component ====================
export default function ChatTab({
  messages,
  onSendMessage,
  onVoiceMessage,
  isSendingMessage = false,
}: Props) {
  const [inputValue, setInputValue] = useState("");
  const [attachments, setAttachments] = useState<AttachmentPreview[]>([]);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [composerError, setComposerError] = useState<string | null>(null);
  const [composerNotice, setComposerNotice] = useState<string | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const lastUserMessageId = [...messages]
    .reverse()
    .find((message) => message.role === "user")?.id;

  const {
    state: recordingState,
    error: recordingError,
    toggle: toggleRecording,
    clearError: clearRecordingError,
  } = useVoiceRecorder((text) => {
    setComposerNotice(text);
  }, onVoiceMessage);

  const handleSend = useCallback(async () => {
    const text = inputValue.trim();
    if (!text && attachments.length === 0) return;
    if (isSending || isSendingMessage) return;

    setIsSending(true);
    try {
      setComposerError(null);
      setComposerNotice(null);

      if (!onSendMessage) {
        setComposerError("Chat sending is not available yet.");
        return;
      }

      const invalidAttachment = attachments.find((attachment) =>
        validateDocumentFile(attachment.file),
      );
      if (invalidAttachment) {
        setComposerError(validateDocumentFile(invalidAttachment.file));
        return;
      }

      await onSendMessage(
        text,
        attachments.map((a) => a.file),
      );

      setInputValue("");
      setAttachments([]);
    } catch (error) {
      setComposerError(getErrorMessage(error, SEND_FAILURE_MESSAGE));
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }
  }, [inputValue, attachments, isSending, isSendingMessage, onSendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setComposerError(null);

    const invalidFile = files.find((file) => validateDocumentFile(file));
    if (invalidFile) {
      setComposerError(validateDocumentFile(invalidFile));
      e.target.value = "";
      return;
    }

    const timestamp = Date.now();
    const previews: AttachmentPreview[] = files.map((file, index) => ({
      id: `${file.name}-${timestamp}-${index}`,
      file,
    }));

    setComposerNotice(null);
    setAttachments((prev) => [...prev, ...previews]);
    e.target.value = "";
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const micLabel =
    recordingState === "recording"
      ? "Stop recording"
      : recordingState === "transcribing"
        ? "Transcribing…"
        : "Voice input";
  const inlineError = composerError ?? recordingError;

  return (
    <div className="flex h-full min-h-[520px] flex-col">
      {/* ── Message list ── */}
      <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
        {messages.map((msg) =>
          msg.role === "user" ? (
            <div key={msg.id} className="flex justify-end">
              <UserMessage
                msg={msg}
                canEdit={msg.id === lastUserMessageId}
                onUseAsDraft={(content) => {
                  setInputValue(content);
                  setComposerError(null);
                  setComposerNotice(
                    "Edit the draft and send it as a new query.",
                  );
                  inputRef.current?.focus();
                }}
              />
            </div>
          ) : (
            <div key={msg.id} className="max-w-2xl">
              <div className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-5">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    Here is a brief of what was captured in that conversation
                  </p>
                  {msg.content && <CopyButton content={msg.content} />}
                </div>
                {msg.transcription && (
                  <p className="mb-3 rounded-lg bg-[var(--color-bg-secondary)] px-3 py-2 text-xs text-[var(--color-text-secondary)]">
                    Voice query: {msg.transcription}
                  </p>
                )}
                {msg.documentTextPreview && (
                  <p className="mb-3 rounded-lg bg-[var(--color-bg-secondary)] px-3 py-2 text-xs text-[var(--color-text-secondary)]">
                    Document context: {msg.documentTextPreview}
                  </p>
                )}
                {msg.title && (
                  <h4 className="font-semibold text-[var(--color-text-color-primary)]">
                    {msg.title}
                  </h4>
                )}
                {msg.bullets && (
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--color-text-body)]">
                    {msg.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
                {msg.content && !msg.bullets && (
                  <p className="text-sm text-[var(--color-text-body)]">
                    {msg.content}
                  </p>
                )}
              </div>
            </div>
          ),
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* ── Input area ── */}
      <div className="px-6 py-6">
        {/* Attachment previews */}
        {attachments.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {attachments.map((a) => (
              <div
                key={a.id}
                className="group relative flex items-center gap-2 rounded-xl border border-[var(--color-card-border)] bg-[var(--color-bg-secondary)] 
                px-3 py-2 text-xs text-[var(--color-text-subtext)]"
              >
                <svg
                  className="h-4 w-4 text-[var(--color-card-text)]"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M4 0a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V5.414A2 2 0 0013.414 4L10 .586A2 2 0 008.586 0H4zm4 1.5V5h3.5L8 1.5z" />
                </svg>
                <span className="max-w-[100px] truncate">{a.file.name}</span>
                <button
                  type="button"
                  onClick={() => removeAttachment(a.id)}
                  aria-label="Remove attachment"
                  className="ml-1 rounded-full text-[var(--color-card-text)] hover:text-[var(--color-error)]"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="currentColor"
                  >
                    <path
                      d="M2.22 2.22a.75.75 0 011.06 0L6 4.94l2.72-2.72a.75.75 0 111.06 1.06L7.06 6l2.72 2.72a.75.75 0 11-1.06 1.06L6 7.06 3.28 9.78a.75.75 0 
                    01-1.06-1.06L4.94 6 2.22 3.28a.75.75 0 010-1.06z"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
        {inlineError && (
          <p
            role="alert"
            className="mb-3 rounded-xl bg-[var(--color-error-bg)] px-4 py-2 text-xs font-medium text-[var(--color-error-text)]"
          >
            {inlineError}
          </p>
        )}
        {composerNotice && !inlineError && (
          <p className="mb-3 rounded-xl border border-[var(--color-card-border)] bg-[var(--color-bg-secondary)] px-4 py-2 text-xs font-medium text-[var(--color-text-secondary)]">
            {composerNotice}
          </p>
        )}

        <div className="flex items-center gap-3 rounded-full border border-[var(--color-card-border)] bg-[var(--color-card-bg)] px-4 py-3">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={ACCEPTED_FILE_TYPES}
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Plus / attach */}
          <button
            type="button"
            className="text-[var(--color-card-text)] transition-colors hover:text-[var(--color-text-color-primary)]"
            aria-label="Attach file"
            onClick={() => {
              setComposerNotice(null);
              fileInputRef.current?.click();
            }}
          >
            <HiOutlinePlus className="h-5 w-5" />
          </button>

          {/* Text input */}
          <input
            ref={inputRef}
            type="text"
            placeholder="Reply to meet mind"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setComposerError(null);
              setComposerNotice(null);
            }}
            onKeyDown={handleKeyDown}
            disabled={isSending || isSendingMessage}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--color-text-placeholder)] disabled:opacity-50"
          />

          {/* Mic */}
          <button
            type="button"
            className={[
              "transition-colors",
              recordingState === "recording"
                ? "text-[var(--color-error)] hover:text-[var(--color-error-text)]"
                : recordingState === "transcribing"
                  ? "cursor-not-allowed text-[var(--color-card-text)] opacity-50"
                  : "text-[var(--color-card-text)] hover:text-[var(--color-text-color-primary)]",
            ].join(" ")}
            aria-label={micLabel}
            onClick={() => {
              clearRecordingError();
              setComposerNotice(null);
              toggleRecording();
            }}
            disabled={
              recordingState === "transcribing" || isSending || isSendingMessage
            }
          >
            {recordingState === "recording" ? (
              <span className="relative flex h-[18px] w-[18px] items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-300 opacity-50" />
                <Image src="/icons/mic.svg" alt="" width={18} height={18} />
              </span>
            ) : (
              <Image src="/icons/mic.svg" alt="" width={18} height={18} />
            )}
          </button>

          {/* Send */}
          <button
            type="button"
            aria-label="Send"
            onClick={handleSend}
            disabled={
              !onSendMessage ||
              isSending ||
              isSendingMessage ||
              (!inputValue.trim() && attachments.length === 0)
            }
            className="transition-opacity disabled:opacity-40 hover:opacity-70"
          >
            {isSending ? (
              <svg
                className="h-[18px] w-[18px] animate-spin text-[var(--color-card-text)]"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                />
              </svg>
            ) : (
              <Image src="/icons/send.svg" alt="Send" width={18} height={18} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
