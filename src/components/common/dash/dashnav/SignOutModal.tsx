"use client";

import React from "react";
import { LuLogOut } from "react-icons/lu";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface SignOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignOut: (signOutAllDevices: boolean) => void;
}

const SignOutModal: React.FC<SignOutModalProps> = ({
  isOpen,
  onClose,
  onSignOut,
}) => {
  const [signOutAllDevices, setSignOutAllDevices] = React.useState(false);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-white rounded-[24px] max-w-[400px] w-full p-8 text-center shadow-xl gap-0 outline-none [&&_button[absolute]]:hidden">
        <div className="mx-auto w-12 h-12 flex items-center justify-center mb-4">
          <LuLogOut className="text-[#EF4444] text-[32px] stroke-[1.5]" />
        </div>

        <DialogTitle
          id="signout-modal-title"
          className="text-[18px] font-bold text-[#0F172A] mb-2"
        >
          Sign out of MeetMind?
        </DialogTitle>

        <p className="text-[14px] text-[#5E6470] mb-6 leading-relaxed">
          You&apos;ll be signed out of your current session.
          <br />
          You can sign back in anytime.
        </p>

        <div className="flex items-center justify-center gap-2 mb-8">
          <input
            type="checkbox"
            id="sign-out-all"
            checked={signOutAllDevices}
            onChange={(e) => setSignOutAllDevices(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-[#02505E] focus:ring-[#02505E] cursor-pointer"
          />
          <label
            htmlFor="sign-out-all"
            className="text-[13px] text-[#5E6470] cursor-pointer select-none"
          >
            sign out from all devices
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-[#02505E] text-[#02505E] font-semibold text-[14px] hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => onSignOut(signOutAllDevices)}
            className="flex-1 py-3 rounded-xl border border-[#EF4444] text-[#EF4444] font-semibold text-[14px] hover:bg-red-50 transition-colors cursor-pointer"
          >
            Sign out
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignOutModal;
