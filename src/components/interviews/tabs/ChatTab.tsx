"use client";

import type { ChatMessage } from "@/types/interview";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { HiOutlinePlus } from "react-icons/hi2";

// ─── Types ────────────────────────────────────────────────────────────────────

type AttachmentPreview = {
  id: string;
  file: File;
  url: string;
  type: "image" | "file";
};

type Props = {
  messages: ChatMessage[];
  onSendMessage?: (content: string, attachments: File[]) => Promise<void>;
  isSendingMessage?: boolean;
  onEditMessage?: (messageId: string, newContent: string) => Promise<void>;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const ACCEPTED_FILE_TYPES = "image/*,application/pdf,.doc,.docx,.txt";
const COPY_CHECKMARK_DURATION_MS = 2000;
const ATTACHMENT_ONLY_MESSAGE =
  "Add a message before sending an attachment. " +
  "Document-only chat is not connected yet.";
const MICROPHONE_BLOCKED_MESSAGE =
  "Microphone access was not granted. Check Chrome site permissions and Windows microphone privacy settings, then reload and try again.";
const SEND_FAILURE_MESSAGE =
  "We could not send your message. Please try again.";

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
          className="absolute inset-0 flex items-center justify-center transition-all duration-300"
          style={{
            opacity: copied ? 1 : 0,
            transform: copied ? "scale(1)" : "scale(0.7)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 7L5.5 10.5L12 3.5"
              stroke="#22c55e"
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

function EditableUserMessage({
  msg,
  onEditMessage,
}: {
  msg: ChatMessage;
  onEditMessage?: Props["onEditMessage"];
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(msg.content);
  const [isSaving, setIsSaving] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      textareaRef.current.focus();
    }
  }, [isEditing, draft]);

  const handleEditClick = () => {
    setDraft(msg.content);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setDraft(msg.content);
  };

  const handleSave = async () => {
    if (!draft.trim() || draft.trim() === msg.content.trim()) {
      setIsEditing(false);
      return;
    }
    setIsSaving(true);
    try {
      await onEditMessage?.(msg.id, draft.trim());
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  if (isEditing) {
    return (
      <div className="flex flex-col items-end gap-2">
        {/* Warning banner — amber is a one-off semantic color, kept as-is */}
        <div className="flex w-full max-w-lg items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs text-amber-700">
          <svg
            className="mt-0.5 h-3.5 w-3.5 shrink-0"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm.75 4a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0V5zm-.75 6a.875.875 0 110-1.75.875.875 0 010 1.75z" />
          </svg>
          <span>
            Editing this message will remove all replies that came after it.
            This cannot be undone.
          </span>
        </div>

        {/* Editable bubble */}
        <div className="w-full max-w-lg rounded-2xl bg-[var(--color-scrollbar-track)] px-5 py-3">
          <textarea
            ref={textareaRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSave();
              if (e.key === "Escape") handleCancel();
            }}
            rows={1}
            className="w-full resize-none bg-transparent text-sm text-[var(--color-text-color-primary)] outline-none"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-full border border-[var(--color-card-border)] px-4 py-1.5 text-xs text-[var(--color-text-secondary)] 
            transition-colors hover:bg-[var(--color-scrollbar-track)]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving || !draft.trim()}
            className="rounded-full bg-[var(--color-text-color-primary)] px-4 py-1.5 text-xs text-[var(--color-text-white-primary)] transition-opacity 
            disabled:opacity-50 hover:opacity-80"
          >
            {isSaving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end">
      <div className="max-w-lg rounded-2xl bg-[var(--color-scrollbar-track)] px-5 py-3 text-sm text-[var(--color-text-color-primary)]">
        {msg.content}
      </div>
      <div className="mt-2 flex justify-end gap-3 text-[var(--color-card-text)]">
        <CopyButton content={msg.content} />
        <button
          type="button"
          aria-label="Edit"
          onClick={handleEditClick}
          className="transition-opacity hover:opacity-70"
        >
          <Image src="/icons/pencil.svg" alt="Edit" width={13} height={13} />
        </button>
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
  transcribeAudio?: (audioBlob: Blob) => Promise<string>,
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
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });

        if (!transcribeAudio) {
          onTranscript("[Voice transcription not connected yet]");
          setState("idle");
          return;
        }

        setState("transcribing");
        try {
          const text = await transcribeAudio(blob);
          onTranscript(text);
        } catch {
          onTranscript("[Transcription failed — please try again]");
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
  isSendingMessage = false,
  onEditMessage,
}: Props) {
  const [inputValue, setInputValue] = useState("");
  const [attachments, setAttachments] = useState<AttachmentPreview[]>([]);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [composerError, setComposerError] = useState<string | null>(null);
  const attachmentsRef = useRef<AttachmentPreview[]>([]);

  useEffect(() => {
    attachmentsRef.current = attachments;
  }, [attachments]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Revoke all object URLs on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      attachmentsRef.current.forEach((a) => {
        if (a.url) URL.revokeObjectURL(a.url);
      });
    };
  }, []);

  const {
    state: recordingState,
    error: recordingError,
    toggle: toggleRecording,
    clearError: clearRecordingError,
  } = useVoiceRecorder((text) => {
    setInputValue((prev) => (prev ? `${prev} ${text}` : text));
  }, undefined);

  const handleSend = useCallback(async () => {
    const text = inputValue.trim();
    if (!text && attachments.length === 0) return;
    if (isSending || isSendingMessage) return;

    setIsSending(true);
    try {
      setComposerError(null);

      if (!onSendMessage) {
        setComposerError("Chat sending is not available yet.");
        return;
      }

      if (!text && attachments.length > 0) {
        setComposerError(ATTACHMENT_ONLY_MESSAGE);
        inputRef.current?.focus();
        return;
      }

      await onSendMessage?.(
        text,
        attachments.map((a) => a.file),
      );

      // ✅ Revoke all object URLs before clearing
      attachments.forEach((a) => {
        if (a.url) URL.revokeObjectURL(a.url);
      });

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
    const previews: AttachmentPreview[] = files.map((file) => ({
      id: `${file.name}-${Date.now()}`,
      file,
      url: file.type.startsWith("image/") ? URL.createObjectURL(file) : "",
      type: file.type.startsWith("image/") ? "image" : "file",
    }));
    setComposerError(null);
    setAttachments((prev) => [...prev, ...previews]);
    e.target.value = "";
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => {
      const item = prev.find((a) => a.id === id);
      if (item?.url) URL.revokeObjectURL(item.url);
      return prev.filter((a) => a.id !== id);
    });
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
              <EditableUserMessage msg={msg} onEditMessage={onEditMessage} />
            </div>
          ) : (
            <div key={msg.id} className="max-w-2xl">
              <div className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-5">
                <p className="mb-3 text-sm text-[var(--color-text-secondary)]">
                  Here is a brief of what was captured in that conversation
                </p>
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
                {a.type === "image" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={a.url}
                    alt={a.file.name}
                    className="h-8 w-8 rounded object-cover"
                  />
                ) : (
                  <svg
                    className="h-4 w-4 text-[var(--color-card-text)]"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M4 0a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V5.414A2 2 0 0013.414 4L10 .586A2 2 0 008.586 0H4zm4 1.5V5h3.5L8 1.5z" />
                  </svg>
                )}
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
            onClick={() => fileInputRef.current?.click()}
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
