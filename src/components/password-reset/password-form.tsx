'use client';

import { type FormEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Check, CheckCircle } from 'lucide-react';
import api from '@/lib/api';
import LogoIcon from './logo-icon';
import PasswordField from './password-field';

const PASSWORD_RULES = [
  {
    id: 'length',
    label: 'At least 8 characters',
    test: (pw: string) => pw.length >= 8,
  },
  {
    id: 'uppercase',
    label: 'Upper case letters (A-Z)',
    test: (pw: string) => /[A-Z]/.test(pw),
  },
  {
    id: 'lowercase',
    label: 'Lower case letter (a-z)',
    test: (pw: string) => /[a-z]/.test(pw),
  },
  {
    id: 'symbol',
    label: 'One symbol (@,#,$,%)',
    test: (pw: string) => /[@#$%]/.test(pw),
  },
];

function PasswordChecklist({
  password,
  showErrors = false,
}: {
  password: string;
  showErrors?: boolean;
}) {
  if (password.length === 0) return null;

  return (
    <ul className="mt-3 space-y-1.5">
      {PASSWORD_RULES.map((rule) => {
        const passed = rule.test(password);
        const failed = !passed && showErrors;

        return (
          <li
            key={rule.id}
            className={`flex items-center gap-2 text-sm transition-colors duration-200 ${
              passed
                ? 'text-emerald-500'
                : failed
                  ? 'text-rose-500'
                  : 'text-gray-400'
            }`}
          >
            <Check
              className={`h-3.5 w-3.5 flex-shrink-0 transition-opacity duration-200 ${
                passed ? 'opacity-100' : 'opacity-30'
              }`}
              strokeWidth={3}
            />
            <span>{rule.label}</span>
          </li>
        );
      })}
    </ul>
  );
}

interface PasswordFormProps {
  onSuccess?: () => void;
}

export default function PasswordForm({ onSuccess }: PasswordFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token')?.trim() ?? '';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage(null);

    if (!token) {
      setMessage({
        type: 'error',
        text: 'Missing reset token in the URL. Please open the page from your email link.',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({
        type: 'error',
        text: 'Passwords do not match.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await api.post('/v1/auth/reset-password', {
        token,
        password: newPassword,
      });

      setIsSuccess(true);
      onSuccess?.();
    } catch {
      setMessage({
        type: 'error',
        text: 'Unable to update password. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const passwordsMatch =
    confirmPassword.length === 0 || newPassword === confirmPassword;

  return (
    <section className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-4 py-8">
      <div className="mx-auto mb-8 hidden h-16 w-16 md:block">
        <LogoIcon className="h-full w-full" />
      </div>

      <div className="w-full max-w-md rounded-2xl bg-white px-4 pb-8 pt-10 shadow-sm sm:px-6 md:px-8 md:py-10">
        {isSuccess ? (
          <div className="text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-emerald-500" />
            <h2 className="mt-4 text-2xl font-bold text-slate-900">
              Password reset successful
            </h2>
            <p className="mt-2 text-gray-500">
              Your password has been updated. You can now log in with your new
              password.
            </p>
            <button
              onClick={() => router.push('/login')}
              className="mt-6 w-full rounded-lg bg-teal-700 py-3.5 text-[15px] font-semibold text-white transition hover:bg-teal-800"
            >
              Sign in
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8 text-center">
              <h2 className="mb-3 text-[20px] font-bold tracking-[-0.02em] text-slate-900 md:text-[28px]">
                Create a new password
              </h2>
              <p className="text-sm leading-relaxed text-gray-500 md:text-[15px]">
                Your new password must be different from previous passwords.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {message ? (
                <div
                  className={`rounded-lg border px-4 py-3 text-sm ${
                    message.type === 'success'
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                      : 'border-rose-200 bg-rose-50 text-rose-700'
                  }`}
                >
                  {message.text}
                </div>
              ) : null}

              {!token ? (
                <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                  Missing reset token in the URL.
                </div>
              ) : null}

              <div>
                <PasswordField
                  label="New password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={setNewPassword}
                  visible={showNewPassword}
                  onToggleVisibility={() => setShowNewPassword((prev) => !prev)}
                />
                <PasswordChecklist
                  password={newPassword}
                  showErrors={confirmPassword.length > 0}
                />
              </div>

              <PasswordField
                label="Confirm password"
                placeholder="Enter new password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                visible={showConfirmPassword}
                onToggleVisibility={() =>
                  setShowConfirmPassword((prev) => !prev)
                }
                helperText={
                  confirmPassword.length > 0 && !passwordsMatch
                    ? 'Passwords do not match'
                    : undefined
                }
                error={confirmPassword.length > 0 && !passwordsMatch}
              />

              <button
                type="submit"
                disabled={isSubmitting || !token}
                className="w-full rounded-lg bg-[#02505E] py-3.5 text-[15px] font-semibold text-white transition hover:bg-[#023a47] disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {isSubmitting ? 'Sending...' : 'Reset Password'}
              </button>

              <a
                href="#"
                className="flex items-center justify-center gap-2 pt-2 text-sm font-medium text-gray-500 transition hover:text-slate-900"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to login</span>
              </a>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
