import { useEffect, useRef, useState, useMemo } from "react";
import { type AgentState } from "@livekit/components-react";

function findGcdLessThan(columns: number, max: number = columns): number {
  function gcd(a: number, b: number): number {
    while (b !== 0) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a;
  }
  for (let i = max; i >= 1; i--) {
    if (gcd(columns, i) === i) {
      return i;
    }
  }
  return 1;
}

function generateConnectingSequenceBar(columns: number): number[][] {
  const seq = [];
  const center = Math.floor(columns / 2);

  for (let x = 0; x < columns; x++) {
    seq.push([x, (x + center) % columns]);
  }

  return seq;
}

function generateListeningSequenceBar(columns: number): number[][] {
  const divisor =
    columns > 8
      ? columns / findGcdLessThan(columns, 4)
      : findGcdLessThan(columns, 2);

  return Array.from({ length: divisor }, (_, idx) => [
    ...Array(Math.floor(columns / divisor))
      .fill(1)
      .map((_, idx2) => idx2 * divisor + idx),
  ]);
}

export const useAgentAudioVisualizerRadialAnimator = (
  state: AgentState | undefined,
  barCount: number,
  interval: number,
): number[] => {
  const [index, setIndex] = useState(0);

  // Track property history securely inside React state to prevent render-phase ref errors
  const [prevParams, setPrevParams] = useState({ state, barCount });

  // FIX 1: Deriving the bar sequence using useMemo to stop cascading state updates
  const sequence = useMemo<number[][]>(() => {
    if (state === "thinking") {
      return generateListeningSequenceBar(barCount);
    } else if (state === "connecting" || state === "initializing") {
      return generateConnectingSequenceBar(barCount);
    } else if (state === "listening") {
      return generateListeningSequenceBar(barCount);
    } else if (state === undefined || state === "speaking") {
      return [new Array(barCount).fill(0).map((_, idx) => idx)];
    } else {
      return [[]];
    }
  }, [state, barCount]);

  // FIX 2: Reset tracking indices during the render cycle if core state changes
  if (prevParams.state !== state || prevParams.barCount !== barCount) {
    setIndex(0);
    setPrevParams({ state, barCount });
  }

  const animationFrameId = useRef<number | null>(null);
  useEffect(() => {
    let startTime = performance.now();

    const animate = (time: DOMHighResTimeStamp) => {
      const timeElapsed = time - startTime;

      if (timeElapsed >= interval) {
        setIndex((prev) => prev + 1);
        startTime = time;
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [interval, sequence.length]); // Cleaned up layout arrays to keep the frame loop steady

  return sequence[index % sequence.length] ?? [];
};
