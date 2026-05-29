"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/** Shows an absolute URL built from `path` plus a copy button. */
export function CopyField({ path }: { path: string }) {
  const [copied, setCopied] = useState(false);

  const url = useMemo(() => {
    if (typeof window === "undefined") {
      return path;
    }

    return window.location.origin + path;
  }, [path]);

  async function copy() {
    await navigator.clipboard.writeText(url);

    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex items-center gap-2">
      <Input readOnly value={url} className="font-mono text-xs" />

      <Button type="button" variant="outline" onClick={copy}>
        {copied ? <Check /> : <Copy />}
        {copied ? "Copied" : "Copy"}
      </Button>
    </div>
  );
}
