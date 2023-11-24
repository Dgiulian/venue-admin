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

// Get a random item from an array
export function getRandomItem<T>(items: T[]): T {
  const index = Math.floor(Math.random() * items.length);
  return items[index];
}

export function formatTimestamp(timestamp: number | null): string {
  if (!timestamp) {
    return "";
  }
  const date = new Date(timestamp);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;

  // return date.toLocaleString();
}
