// src/lib/livekit/init.ts
// Helper to create and connect a LiveKit Room instance.
// Accepts a LiveKit server URL (wss://...) and a participant token.
// Returns the connected Room instance.

import { Room } from "livekit-client";

/**
 * Initialize a LiveKit connection.
 * @param serverUrl - The LiveKit WebSocket URL, e.g. "wss://your-project.livekit.cloud"
 * @param token - The JWT participant token obtained from backend.
 * @returns Promise that resolves to a connected Room instance.
 */
export async function initLiveKitRoom(
  serverUrl: string,
  token: string,
): Promise<Room> {
  const room = new Room();
  try {
    await room.connect(serverUrl, token);
    console.log("LiveKit room connected:", room);
    return room;
  } catch (error) {
    console.error("Failed to connect LiveKit room", error);
    throw error;
  }
}

// Example usage (you can call this from a React component or any async context):
// const room = await initLiveKitRoom("wss://meetmind-5fv6f5wu.livekit.cloud", participantToken);
