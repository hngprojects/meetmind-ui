"use client";

import React from "react";
import { FiCopy } from "react-icons/fi";
import { LuFileSpreadsheet } from "react-icons/lu";
import { HiOutlineDownload } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface ExportModalProps {
  open: boolean;
  onClose: () => void;
}

const ExportModal = ({ open, onClose }: ExportModalProps) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-110 rounded-3xl p-8 bg-popover border-color-card-border shadow-xl outline-none gap-0 [&&_button[absolute]]:hidden">
        <div className="flex flex-col items-center text-center mt-4 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-color-bg-secondary text-color-text-color-primary mb-3">
            <LuFileSpreadsheet className="h-6 w-6 stroke-[1.5]" />
          </div>

          <DialogTitle className="text-xl font-bold text-color-text-color-primary tracking-tight mb-2">
            Review packet ready
          </DialogTitle>

          <p className="text-xs font-normal text-color-text-secondary leading-relaxed max-w-[320px]">
            This packet contains the summary, scorecard, notes, and action items
            as for each candidate ready for the hiring panel.
          </p>
        </div>
        <div className="border border-color-card-border rounded-2xl overflow-hidden bg-color-card-bg text-sm mb-8 divide-y divide-color-card-border">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-color-text-color-primary font-medium">
              Candidates
            </span>
            <span className="text-color-text-body font-normal">5</span>
          </div>

          <div className="flex items-center justify-between px-4 py-3 gap-4">
            <span className="text-color-text-color-primary font-medium shrink-0">
              Packet Includes
            </span>
            <span className="text-color-text-body font-normal text-right truncate">
              Summary, scorecard, action items
            </span>
          </div>

          <div className="flex items-center justify-between px-4 py-3 gap-4">
            <span className="text-color-text-color-primary font-medium shrink-0">
              Scorecard Status
            </span>
            <span className="text-color-text-body font-normal text-right truncate">
              Finalized with reviewer context
            </span>
          </div>

          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-color-text-color-primary font-medium">
              Exported at
            </span>
            <span className="text-color-text-body font-normal">
              May 8, 2026, 3:42 PM
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 w-full">
          <Button
            variant="ghost"
            className="flex-1 h-11 border border-button-outline-border text-color-button-primary-bg font-semibold rounded-xl hover:bg-color-bg-secondary gap-2"
          >
            <FiCopy className="h-4 w-4 stroke-2" />
            Copy to Clipboard
          </Button>

          <Button className="flex-1 h-11 bg-color-button-primary-bg hover:bg-color-button-primary-bg/90 text-color-button-primary-text font-semibold rounded-xl gap-2 shadow-none">
            <HiOutlineDownload className="h-5 w-5 stroke-2" />
            Export
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportModal;
