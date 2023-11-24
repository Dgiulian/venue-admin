import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function closeMediaDevices(stream: MediaStream | null): void {
  if (!stream) {
    console.error("No media stream provided");
    return;
  }

  // Get all the tracks from the stream
  const tracks = stream.getTracks();

  // Stop each track
  tracks.forEach((track: MediaStreamTrack) => track.stop());

  console.log("Media devices closed");
}
