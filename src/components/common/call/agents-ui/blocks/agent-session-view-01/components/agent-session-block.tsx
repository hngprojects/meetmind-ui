"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, type MotionProps, motion } from "motion/react";
import {
  useAgent,
  useSessionContext,
  useSessionMessages,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { toast } from "sonner";
import { AgentChatTranscript } from "@/components/common/call/agents-ui/agent-chat-transcript";
import {
  AgentControlBar,
  type AgentControlBarControls,
} from "@/components/common/call/agents-ui/agent-control-bar";
import { Shimmer } from "@/components/common/call/ai-elements/shimmer";
import { cn } from "@/lib/utils";
import { TileLayout } from "./tile-view";

const MotionMessage = motion.create(Shimmer);

const BOTTOM_VIEW_MOTION_PROPS: MotionProps = {
  variants: {
    visible: {
      opacity: 1,
      translateY: "0%",
    },
    hidden: {
      opacity: 0,
      translateY: "100%",
    },
  },
  initial: "hidden",
  animate: "visible",
  exit: "hidden",
  transition: {
    duration: 0.3,
    delay: 0.5,
    ease: "easeOut",
  },
};

const CHAT_MOTION_PROPS: MotionProps = {
  variants: {
    hidden: {
      opacity: 0,
      transition: {
        ease: "easeOut",
        duration: 0.3,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        ease: "easeOut",
        duration: 0.3,
      },
    },
  },
  initial: "hidden",
  animate: "visible",
  exit: "hidden",
};

const SHIMMER_MOTION_PROPS: MotionProps = {
  variants: {
    visible: {
      opacity: 1,
      transition: {
        ease: "easeIn",
        duration: 0.5,
        delay: 0.8,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        ease: "easeIn",
        duration: 0.5,
        delay: 0,
      },
    },
  },
  initial: "hidden",
  animate: "visible",
  exit: "hidden",
};

interface FadeProps {
  top?: boolean;
  bottom?: boolean;
  className?: string;
}

export function Fade({ top = false, bottom = false, className }: FadeProps) {
  return (
    <div
      className={cn(
        "from-background pointer-events-none h-4 bg-linear-to-b to-transparent",
        top && "bg-linear-to-b",
        bottom && "bg-linear-to-t",
        className,
      )}
    />
  );
}

export interface AgentSessionView_01Props {
  /**
   * Message shown above the controls before the first chat message is sent.
   *
   * @default 'Agent is listening, ask it a question'
   */
  preConnectMessage?: string;
  /**
   * Enables or disables the chat toggle and transcript input controls.
   *
   * @default true
   */
  supportsChatInput?: boolean;
  /**
   * Enables or disables camera controls in the bottom control bar.
   *
   * @default true
   */
  supportsVideoInput?: boolean;
  /**
   * Enables or disables screen sharing controls in the bottom control bar.
   *
   * @default true
   */
  supportsScreenShare?: boolean;
  /**
   * Shows a pre-connect buffer state with a shimmer message before messages appear.
   *
   * @default true
   */
  isPreConnectBufferEnabled?: boolean;

  /** Selects the visualizer style rendered in the main tile area. */
  audioVisualizerType?: "bar" | "wave" | "grid" | "radial" | "aura";
  /** Primary hex color used by supported audio visualizer variants. */
  audioVisualizerColor?: `#${string}`;
  /** Hue shift intensity used by certain visualizers. */
  audioVisualizerColorShift?: number;
  /** Number of bars to render when `audioVisualizerType` is `bar`. */
  audioVisualizerBarCount?: number;
  /** Number of rows in the visualizer when `audioVisualizerType` is `grid`. */
  audioVisualizerGridRowCount?: number;
  /** Number of columns in the visualizer when `audioVisualizerType` is `grid`. */
  audioVisualizerGridColumnCount?: number;
  /** Number of radial bars when `audioVisualizerType` is `radial`. */
  audioVisualizerRadialBarCount?: number;
  /** Base radius of the radial visualizer when `audioVisualizerType` is `radial`. */
  audioVisualizerRadialRadius?: number;
  /** Stroke width of the wave path when `audioVisualizerType` is `wave`. */
  audioVisualizerWaveLineWidth?: number;
  /** Optional class name merged onto the outer `<section>` container. */
  className?: string;
}

export function AgentSessionView_01({
  preConnectMessage = "Agent is listening, ask it a question",
  supportsChatInput = true,
  supportsVideoInput = true,
  supportsScreenShare = true,
  isPreConnectBufferEnabled = true,

  audioVisualizerType,
  audioVisualizerColor,
  audioVisualizerColorShift,
  audioVisualizerBarCount,
  audioVisualizerGridRowCount,
  audioVisualizerGridColumnCount,
  audioVisualizerRadialBarCount,
  audioVisualizerRadialRadius,
  audioVisualizerWaveLineWidth,
  ref,
  className,
  ...props
}: React.ComponentProps<"section"> & AgentSessionView_01Props) {
  const session = useSessionContext();
  const { messages } = useSessionMessages(session);
  const [chatOpen, setChatOpen] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { state: agentState } = useAgent();

  const controls: AgentControlBarControls = {
    leave: true,
    microphone: true,
    chat: supportsChatInput,
    camera: supportsVideoInput,
    screenShare: supportsScreenShare,
  };

  const [permissionDenied, setPermissionDenied] = useState(false);

  // Enhanced permission state checking on mount
  useEffect(() => {
    async function checkPermissions() {
      if (typeof window === "undefined") return;

      try {
        // Check microphone permission status
        if (navigator.permissions?.query) {
          try {
            const micStatus = await navigator.permissions.query({
              name: "microphone" as PermissionName,
            });

            if (micStatus.state === "denied") {
              console.warn("Microphone permission is explicitly denied");
              setPermissionDenied(true);
            } else if (micStatus.state === "prompt") {
              console.log(
                "Microphone permission is in prompt state - will request on first use",
              );
              setPermissionDenied(false);
            } else if (micStatus.state === "granted") {
              console.log("Microphone permission is granted");
              setPermissionDenied(false);
            }

            // Listen for permission state changes
            const handlePermissionChange = () => {
              setPermissionDenied(micStatus.state === "denied");
              console.log("Microphone permission changed to:", micStatus.state);
            };

            micStatus.addEventListener("change", handlePermissionChange);
            return () =>
              micStatus.removeEventListener("change", handlePermissionChange);
          } catch (permErr) {
            // Permissions API might not support 'microphone' in some browsers
            console.debug(
              "Permissions API query failed (this is normal in some browsers):",
              (permErr as Error).message,
            );
          }
        } else {
          console.debug(
            "Permissions API not available - relying on device error handling",
          );
        }
      } catch (err) {
        console.error("Unexpected error during permission check:", err);
      }
    }

    checkPermissions();
  }, []);

  const handleDeviceError = (deviceError: {
    source: Track.Source;
    error: unknown;
  }) => {
    const domErr = deviceError.error as
      | { name?: string; message?: string }
      | undefined;
    const errorName = domErr?.name ?? "UnknownError";
    const errorMessage = domErr?.message ?? String(deviceError.error);

    console.error("Device error occurred:", {
      source: deviceError.source,
      errorName,
      errorMessage,
    });

    if (errorName === "NotAllowedError") {
      // Permission explicitly denied by user
      console.warn("User denied microphone/camera permissions");
      setPermissionDenied(true);
      toast.error(
        "Microphone/Camera access denied. Please grant permissions in your browser settings.",
      );
    } else if (errorName === "NotFoundError") {
      // Device not found
      console.warn("Media device not found");
      toast.error("No microphone or camera found on your device.");
    } else {
      // Other device errors
      console.warn("Unexpected device error:", deviceError.error);
      toast.error(`Device error: ${errorMessage}`);
    }
  };

  const handleRetryPermissions = async () => {
    try {
      console.log("Attempting to request permissions...");
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: supportsVideoInput,
      });
      // Permission granted — stop tracks and clear the banner
      stream.getTracks().forEach((t) => t.stop());
      setPermissionDenied(false);
      console.log("Permission request succeeded");
      toast.success("Permissions granted! You can now unmute your microphone.");
    } catch (err) {
      const domErr = err as { name?: string; message?: string } | undefined;
      const errorName = domErr?.name ?? "UnknownError";
      const errorMessage = domErr?.message ?? String(err);
      console.error("Permission retry failed:", { errorName, errorMessage });

      if (errorName === "NotAllowedError") {
        toast.error(
          "Permission still denied. Click the lock 🔒 icon in your browser address bar → set Microphone & Camera to 'Allow' → then reload the page.",
        );
      } else {
        toast.error(`Permission request failed: ${errorMessage}`);
      }
    }
  };

  useEffect(() => {
    const lastMessage = messages.at(-1);
    const lastMessageIsLocal = lastMessage?.from?.isLocal === true;

    if (scrollAreaRef.current && lastMessageIsLocal) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section
      ref={ref}
      className={cn(
        "bg-background relative z-10 h-full w-full overflow-hidden",
        className,
      )}
      {...props}
    >
      <Fade top className="absolute inset-x-4 top-0 z-10 h-40" />

      {/* Permission denied banner */}
      {permissionDenied && (
        <div className="absolute inset-x-0 top-0 z-50 flex items-center justify-center gap-3 bg-destructive/90 px-4 py-3 text-sm text-white backdrop-blur-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5 shrink-0"
          >
            <path
              fillRule="evenodd"
              d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 
                5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0"
              clipRule="evenodd"
            />
          </svg>
          <span>
            <strong>Microphone/Camera blocked.</strong> Click the lock or tune
            icon (🔒/⚙️) in your browser address bar → set Microphone &amp;
            Camera to <strong>&quot;Allow&quot;</strong> → then reload the page.
          </span>
          <button
            type="button"
            onClick={handleRetryPermissions}
            className="shrink-0 rounded-md bg-white/20 px-3 py-1 text-xs font-semibold text-white hover:bg-white/30 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* transcript */}

      <div className="absolute top-0 bottom-[135px] flex w-full flex-col md:bottom-[170px]">
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              {...CHAT_MOTION_PROPS}
              className="flex h-full w-full flex-col gap-4 space-y-3 transition-opacity duration-300 ease-out"
            >
              <AgentChatTranscript
                agentState={agentState}
                messages={messages}
                className="mx-auto w-full max-w-2xl [&_.is-user>div]:rounded-[22px] [&>div>div]:px-4 [&>div>div]:pt-40 md:[&>div>div]:px-6"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Tile layout */}
      <TileLayout
        chatOpen={chatOpen}
        audioVisualizerType={audioVisualizerType}
        audioVisualizerColor={audioVisualizerColor}
        audioVisualizerColorShift={audioVisualizerColorShift}
        audioVisualizerBarCount={audioVisualizerBarCount}
        audioVisualizerRadialBarCount={audioVisualizerRadialBarCount}
        audioVisualizerRadialRadius={audioVisualizerRadialRadius}
        audioVisualizerGridRowCount={audioVisualizerGridRowCount}
        audioVisualizerGridColumnCount={audioVisualizerGridColumnCount}
        audioVisualizerWaveLineWidth={audioVisualizerWaveLineWidth}
      />
      {/* Bottom */}
      <motion.div
        {...BOTTOM_VIEW_MOTION_PROPS}
        className="absolute inset-x-3 bottom-0 z-50 md:inset-x-12"
      >
        {/* Pre-connect message */}
        {isPreConnectBufferEnabled && (
          <AnimatePresence>
            {messages.length === 0 && (
              <MotionMessage
                key="pre-connect-message"
                duration={2}
                aria-hidden={messages.length > 0}
                {...SHIMMER_MOTION_PROPS}
                className="pointer-events-none mx-auto block w-full max-w-2xl pb-4 text-center text-sm font-semibold"
              >
                {preConnectMessage}
              </MotionMessage>
            )}
          </AnimatePresence>
        )}
        <div className="bg-background relative mx-auto max-w-2xl pb-3 md:pb-12">
          <Fade
            bottom
            className="absolute inset-x-0 top-0 h-4 -translate-y-full"
          />
          <AgentControlBar
            variant="livekit"
            controls={controls}
            isChatOpen={chatOpen}
            isConnected={session.isConnected}
            onDisconnect={session.end}
            onIsChatOpenChange={setChatOpen}
            onDeviceError={handleDeviceError}
          />
        </div>
      </motion.div>
    </section>
  );
}
