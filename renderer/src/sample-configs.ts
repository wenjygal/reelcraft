// Fixtures for Remotion Studio preview and for eyeballing the templates before
// step 3 ever runs for real. Not used by the render pipeline itself — real runs
// always pass their own composition-config.json via `--props`.
import type { MarketingConfig, TrainingConfig } from "./types";

export const sampleMarketingConfig: MarketingConfig = {
  mode: "marketing",
  title: "reelcraft sample",
  format: "vertical",
  fps: 30,
  durationInFrames: 30 * 20,
  theme: { primaryColor: "#111111", backgroundColor: "#ffcc00", fontFamily: "Rubik", rtl: false },
  audio: { musicTrack: null, musicVolume: 0.3, sfxEnabled: false, voiceover: null },
  scenes: [
    { id: "hook", kind: "hook", durationInFrames: 60, text: "You built it." },
    { id: "reveal", kind: "reveal", durationInFrames: 90, text: "Now brag — with Remotion." },
    { id: "highlight-1", kind: "highlight", durationInFrames: 150, text: "Two modes. One command." },
    { id: "punchline", kind: "punchline", durationInFrames: 60, text: "/reelcraft" },
  ],
};

export const sampleTrainingConfig: TrainingConfig = {
  mode: "training",
  title: "reelcraft sample",
  format: "landscape",
  fps: 30,
  durationInFrames: 30 * 30,
  theme: { primaryColor: "#0057ff", backgroundColor: "#0b0b0f", fontFamily: "Heebo", rtl: false },
  audio: { musicTrack: null, musicVolume: 0.25, sfxEnabled: false, voiceover: null },
  scenes: [
    { id: "before", kind: "before", durationInFrames: 120, caption: "Before: a codebase, no reel." },
    {
      id: "step-1",
      kind: "step",
      stepNumber: 1,
      durationInFrames: 240,
      caption: "Run /reelcraft --mode training",
      highlight: { x: 0.3, y: 0.4, w: 0.4, h: 0.2 },
    },
    { id: "after", kind: "after", durationInFrames: 150, caption: "After: a training video, done." },
  ],
};
