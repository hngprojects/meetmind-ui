"use client";

import { useMemo } from "react";
import axios from "axios";
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
import api from "@/lib/api";
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
  token?: string;
}

export function App({ appConfig, sessionId, token }: AppProps) {
  const tokenSource = useMemo(() => {
    const API_BASE =
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://api.staging.meetmind.hng14.com";

    if (sessionId) {
      // Custom token source: pin the room name to the interview session id so
      // the agent loads that session's config.
      return TokenSource.custom(async () => {
        // 1. Fetch interview details
        let participantName = "Candidate";
        try {
          let interviewRes;
          if (token) {
            // Use a raw axios instance (not the shared api instance) to avoid
            // the auth interceptor in src/lib/api.ts redirecting unauthenticated
            // candidates to /sign-in on a 401 response from this public,
            // token-authenticated endpoint.
            interviewRes = await axios.get(
              `${API_BASE}/api/v1/interviews/call/${sessionId}`,
              { params: { token } },
            );
          } else {
            // Fallback for authenticated users / testing
            interviewRes = await api.get(`/api/v1/interviews/${sessionId}`);
          }
          const interviewData = interviewRes.data;
          const payload = interviewData?.data ?? interviewData;
          participantName =
            payload?.candidate?.name ?? payload?.candidate_name ?? "Candidate";
        } catch (e) {
          console.warn(
            "Failed to fetch interview details for candidate name:",
            e,
          );
        }

        // 2. Fetch the LiveKit token — useSession will use these credentials to
        //    call room.connect() internally. Do NOT call room.connect() here;
        //    doing so consumes the token and prevents useSession from connecting.
        const tokenRes = await api.post(`/api/v1/livekit/${sessionId}/token`, {
          participant_name: participantName,
        });
        const tokenData = tokenRes.data;

        // Return credentials to useSession which manages the WSS connection.
        return {
          serverUrl: tokenData.serverUrl,
          participantToken: tokenData.participantToken,
          roomName: tokenData.roomName || sessionId,
          participantName: tokenData.participantName || participantName,
        };
      });
    }
    return typeof process.env.NEXT_PUBLIC_CONN_DETAILS_ENDPOINT === "string"
      ? getSandboxTokenSource(appConfig)
      : TokenSource.endpoint(`${API_BASE}/api/v1/token`);
  }, [appConfig, sessionId, token]);

  const session = useSession(
    tokenSource,
    appConfig.agentName ? { agentName: appConfig.agentName } : undefined,
  );

  return (
    <AgentSessionProvider session={session}>
      <AppSetup />
      <main className="grid h-svh grid-cols-1 place-content-center">
        <ViewController appConfig={appConfig} interviewId={sessionId} />
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
