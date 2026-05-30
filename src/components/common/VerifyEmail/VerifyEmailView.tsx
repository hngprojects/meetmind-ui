"use client";

import React, { useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { resendVerificationEmail } from "@/lib/auth";

interface Props {
  email: string | null;
}

const COOLDOWN_TIME = 60;

const VerifyEmailView = ({ email }: Props) => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleResend = async () => {
    if (!email || loading || cooldown > 0) return;

    try {
      setLoading(true);
      setSent(false);

      await resendVerificationEmail(email);

      setSent(true);

      // start cooldown
      setCooldown(COOLDOWN_TIME);

      // clear any existing interval before starting a new one
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      console.error("Failed to resend email", err);
    } finally {
      setLoading(false);
    }
  };

  // cleanup on unmount (important)
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-secondary)] px-4">
        <div className="text-center max-w-sm">
          <h2 className="text-[18px] font-semibold text-[var(--color-text-color-primary)] mb-2">
            No email found
          </h2>
          <p className="text-[var(--color-text-secondary)] text-sm">
            Please sign in again to continue verification.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-secondary)] px-4">
      <div className="w-full max-w-[480px] text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[var(--color-soft-green)] flex items-center justify-center">
            <Mail size={26} className="text-[var(--color-brand-primary)]" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-[28px] font-semibold text-[var(--color-text-color-primary)] mb-2">
          Check your inbox
        </h1>

        {/* Description */}
        <p className="text-[15px] text-[var(--color-text-secondary)] leading-relaxed mb-6">
          We’ve sent a verification link to{" "}
          <span className="text-[var(--color-text-color-primary)] font-medium">
            {email}
          </span>
          . Please check your inbox or spam folder to continue.
        </p>

        {/* Success message */}
        {sent && (
          <div className="mb-4 text-sm text-[var(--color-text-success)] bg-[var(--color-bg-success)] py-2 rounded-md">
            A new verification email has been sent.
          </div>
        )}

        {/* Resend Button */}
        <Button
          onClick={handleResend}
          disabled={loading || cooldown > 0}
          className="
            w-full
            bg-[var(--color-button-primary-bg)]
            hover:bg-[var(--color-accent-teal-dark)]
            text-[var(--color-button-primary-text)]
            rounded-md
            py-2
            transition-all
            disabled:opacity-70
            disabled:cursor-not-allowed
          "
        >
          {loading
            ? "Sending..."
            : cooldown > 0
              ? `Resend in ${cooldown}s`
              : "Resend Email"}
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmailView;
