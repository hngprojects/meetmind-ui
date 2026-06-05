"use client";

import { useTheme } from "@teispace/next-themes";
import { AnimatePresence, motion } from "motion/react";
import { useSessionContext } from "@livekit/components-react";
import type { AppConfig } from "@/hooks/call/app-config";
import { AgentSessionView_01 } from "../agents-ui/blocks/agent-session-view-01";
import { WelcomeView } from "./welcome-view";

const MotionWelcomeView = motion.create(WelcomeView);
const MotionSessionView = motion.create(AgentSessionView_01);

// FIX: Appended 'as const' to freeze the object properties so TypeScript
// knows 'linear' is exactly the literal animation string, not a generic string.
const VIEW_MOTION_PROPS = {
  variants: {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  },
  initial: "hidden",
  animate: "visible",
  exit: "hidden",
  transition: {
    duration: 0.5,
    ease: "linear",
  },
} as const;

interface ViewControllerProps {
  appConfig: AppConfig;
  interviewId?: string;
}

export function ViewController({
  appConfig,
  interviewId,
}: ViewControllerProps) {
  const { isConnected, start } = useSessionContext();
  const { resolvedTheme } = useTheme();

  const handleStartCall = async () => {
    if (typeof window !== "undefined" && navigator.mediaDevices?.getUserMedia) {
      try {
        const constraints: MediaStreamConstraints = { audio: true };
        if (appConfig.supportsVideoInput) {
          constraints.video = true;
        }
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        stream.getTracks().forEach((track) => track.stop());
      } catch (err) {
        const error = err as Error;
        // Log detailed error information for debugging
        console.warn("Initial media permission request failed:", {
          message: error.message,
          name: error.name,
          permissionRequired: error.name === "NotAllowedError",
        });

        // If it's a permission error, the agent-session-block component will handle showing the banner
        // Don't prevent starting the session - let the user connect and handle permissions there
        if (
          error.name !== "NotAllowedError" &&
          error.name !== "NotFoundError"
        ) {
          console.error("Unexpected media device error:", error);
        }
      }
    }
    start();
  };

  return (
    <AnimatePresence mode="wait">
      {/* Welcome view */}
      {!isConnected && (
        <MotionWelcomeView
          key="welcome"
          {...VIEW_MOTION_PROPS}
          startButtonText={appConfig.startButtonText}
          onStartCall={handleStartCall}
        />
      )}
      {/* Session view */}
      {isConnected && (
        <MotionSessionView
          key="session-view"
          {...VIEW_MOTION_PROPS}
          supportsChatInput={appConfig.supportsChatInput}
          supportsVideoInput={appConfig.supportsVideoInput}
          supportsScreenShare={appConfig.supportsScreenShare}
          isPreConnectBufferEnabled={appConfig.isPreConnectBufferEnabled}
          audioVisualizerType={appConfig.audioVisualizerType}
          audioVisualizerColor={
            resolvedTheme === "dark"
              ? appConfig.audioVisualizerColorDark
              : appConfig.audioVisualizerColor
          }
          audioVisualizerColorShift={appConfig.audioVisualizerColorShift}
          audioVisualizerBarCount={appConfig.audioVisualizerBarCount}
          audioVisualizerGridRowCount={appConfig.audioVisualizerGridRowCount}
          audioVisualizerGridColumnCount={
            appConfig.audioVisualizerGridColumnCount
          }
          audioVisualizerRadialBarCount={
            appConfig.audioVisualizerRadialBarCount
          }
          audioVisualizerRadialRadius={appConfig.audioVisualizerRadialRadius}
          audioVisualizerWaveLineWidth={appConfig.audioVisualizerWaveLineWidth}
          interviewId={interviewId}
          className="fixed inset-0"
        />
      )}
    </AnimatePresence>
  );
}
