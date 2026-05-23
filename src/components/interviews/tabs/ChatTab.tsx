"use client";

import type { ChatMessage } from "@/types/interview";
import { HiOutlinePlus } from "react-icons/hi2";
import Image from "next/image";

type Props = {
  messages: ChatMessage[];
};

export default function ChatTab({ messages }: Props) {
  return (
    <div className="flex h-full min-h-[520px] flex-col">
      <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
        {messages.map((msg) =>
          msg.role === "user" ? (
            <div key={msg.id} className="flex justify-end">
              <div>
                <div className="max-w-lg rounded-2xl bg-[#f3f4f6] px-5 py-3 text-sm text-[#0f172a]">
                  {msg.content}
                </div>
                <div className="mt-2 flex justify-end gap-3 text-[#9ca3af]">
                  <button type="button" aria-label="Copy">
                    <Image
                      src="/icons/copy.svg"
                      alt="Copy"
                      width={14}
                      height={14}
                    />
                  </button>
                  <button type="button" aria-label="Edit">
                    <Image
                      src="/icons/pencil.svg"
                      alt="Edit"
                      width={13}
                      height={13}
                    />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div key={msg.id} className="max-w-2xl">
              {/* <p className="mb-3 text-sm text-[#6b7280]">
                Here is a brief of what was captured in that conversation
              </p> */}
              <div className="rounded-xl border border-[#e5e7eb] bg-white p-5">
                <p className="mb-3 text-sm text-[#6b7280]">
                  Here is a brief of what was captured in that conversation
                </p>

                {msg.title && (
                  <h4 className="font-semibold text-[#0f172a]">{msg.title}</h4>
                )}
                {msg.bullets && (
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#4b5563]">
                    {msg.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
                {msg.content && !msg.bullets && (
                  <p className="text-sm text-[#4b5563]">{msg.content}</p>
                )}
              </div>
            </div>
          ),
        )}
      </div>

      <div className="px-6 py-6">
        <div className="flex items-center gap-3 rounded-full border border-[#e5e7eb] bg-white px-4 py-3">
          <button
            type="button"
            className="text-[#9ca3af] hover:text-[#0f172a]"
            aria-label="Attach"
          >
            <HiOutlinePlus className="h-5 w-5" />
          </button>
          <input
            type="text"
            placeholder="Reply to meet mind"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-[#9ca3af]"
          />
          <button
            type="button"
            className="text-[#9ca3af] hover:text-[#0f172a]"
            aria-label="Voice"
          >
            <Image src="/icons/mic.svg" alt="Voice" width={18} height={18} />
          </button>
          <button type="button" aria-label="Send">
            <Image src="/icons/send.svg" alt="Send" width={18} height={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
