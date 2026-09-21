// Fixtures for Remotion Studio preview and for eyeballing the templates before
// step 3 ever runs for real. Not used by the render pipeline itself — real runs
// always pass their own composition-config.json via `--props`.
import type { MarketingConfig, TrainingConfig } from "./types";

// Real dogfood run against hamal4kids/my-smart-pack (2026-09-21) — screenshots
// copied into public/screenshots/. Kept as the Studio default because a real
// example is a better sanity check than a placeholder ("You built it, now
// brag") that never shows whether real screenshots actually read well.
export const sampleMarketingConfig: MarketingConfig = {
  mode: "marketing",
  title: "חמ״ל תיקתק",
  format: "vertical",
  fps: 30,
  durationInFrames: 600,
  theme: { primaryColor: "#A1499A", backgroundColor: "#D3E9E9", fontFamily: "Rubik", rtl: true },
  audio: { musicTrack: null, musicVolume: 0.3, sfxEnabled: false, voiceover: null },
  scenes: [
    { id: "hook", kind: "hook", durationInFrames: 75, text: "כל ערב אותו בלגן?" },
    {
      id: "reveal",
      kind: "reveal",
      durationInFrames: 90,
      text: "חמ״ל תיקתק — מסדרים תיק לפי מערכת שעות",
      mediaRef: "screenshots/home-clean.png",
    },
    {
      id: "highlight-1",
      kind: "highlight",
      durationInFrames: 150,
      text: "כל ערב, בדיוק מה שצריך למחר",
      mediaRef: "screenshots/home-configured-clean.png",
    },
    {
      id: "highlight-2",
      kind: "highlight",
      durationInFrames: 150,
      text: "צ'קליסט מדויק לכל פריט בתיק",
      mediaRef: "screenshots/checklist-clean.png",
    },
    {
      id: "punchline",
      kind: "punchline",
      durationInFrames: 135,
      text: "תיק מוכן. מדבקה ברשימה 🎉",
      mediaRef: "screenshots/reward-clean.png",
    },
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
