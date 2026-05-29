"use client";

import { useMemo } from "react";
import { TokenSource } from "livekit-client";
import { useSession } from "@livekit/components-react";
import { WarningIcon } from "@phosphor-icons/react/dist/ssr";
import type { AppConfig } from "@/hooks/call/app-config";
import { AgentSessionProvider } from "../agents-ui/agent-session-provider";
import { StartAudioButton } from "../agents-ui/start-audio-button";
import { ViewController } from "../app/view-controller";
import { Toaster } from "@/components/ui/sonner";
import { useAgentErrors } from "@/hooks/call/useAgentErrors";
import { useDebugMode } from "@/hooks/call/useDebug";
import { getSandboxTokenSource } from "@/lib/call/utils";

const IN_DEVELOPMENT = process.env.NODE_ENV !== "production";

function AppSetup() {
  useDebugMode({ enabled: IN_DEVELOPMENT });
  useAgentErrors();

  return null;
}

interface AppProps {
  appConfig: AppConfig;
  /** Interview session id — when set, the call joins room === sessionId. */
  sessionId?: string;
}

export function App({ appConfig, sessionId }: AppProps) {
  const tokenSource = useMemo(() => {
    if (sessionId) {
      // Custom token source: pin the room name to the interview session id so
      // the agent loads that session's config.
      return TokenSource.custom(async () => {
        const res = await fetch(
          `${"https://api.staging.meetmind.hng14.com"}/api/v1/token`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId }),
          },
        );
        if (!res.ok) {
          throw new Error("Failed to fetch connection details");
        }
        return res.json();
      });
    }
    return typeof process.env.NEXT_PUBLIC_CONN_DETAILS_ENDPOINT === "string"
      ? getSandboxTokenSource(appConfig)
      : TokenSource.endpoint(
          "https://api.staging.meetmind.hng14.com/api/v1/token",
        );
  }, [appConfig, sessionId]);

  const session = useSession(
    tokenSource,
    appConfig.agentName ? { agentName: appConfig.agentName } : undefined,
  );

  return (
    <AgentSessionProvider session={session}>
      <AppSetup />
      <main className="grid h-svh grid-cols-1 place-content-center">
        <ViewController appConfig={appConfig} />
      </main>
      <StartAudioButton label="Start Audio" />
      <Toaster
        icons={{
          warning: <WarningIcon weight="bold" />,
        }}
        position="top-center"
        className="toaster group"
        style={
          {
            "--normal-bg": "var(--popover)",
            "--normal-text": "var(--popover-foreground)",
            "--normal-border": "var(--border)",
          } as React.CSSProperties
        }
      />
    </AgentSessionProvider>
  );
}
