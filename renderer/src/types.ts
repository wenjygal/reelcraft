// Shared shape of composition-config.json — produced by
// skills/reelcraft/references/steps/step-3-compose.md, consumed by
// MarketingReel.tsx / TrainingReel.tsx as Remotion input props.
// Keep this file and that step doc in sync if the schema changes.
//
// All `mediaRef` / `musicTrack` / `sfxCue` / `voiceover.clips[].audioFile` paths
// are relative to `<output folder>/media/` (step 3 copies assets there; step 4
// renders with `--public-dir` pointed at that folder so `staticFile()` resolves).

export type Format = "landscape" | "vertical" | "square";

export type Theme = {
  primaryColor: string;
  backgroundColor: string;
  fontFamily: "Heebo" | "Rubik" | string;
  rtl: boolean;
};

export type VoiceoverClip = {
  sceneId: string;
  text: string;
  audioFile: string;
};

export type Audio = {
  musicTrack: string | null;
  musicVolume: number;
  sfxEnabled: boolean;
  voiceover: { lang: "en" | "he"; clips: VoiceoverClip[] } | null;
};

export type MarketingScene =
  | { id: string; kind: "hook"; durationInFrames: number; text: string; mediaRef?: string }
  | { id: string; kind: "reveal"; durationInFrames: number; text: string; mediaRef?: string }
  | {
      id: string;
      kind: "highlight";
      durationInFrames: number;
      text: string;
      mediaRef?: string;
      sfxCue?: string;
    }
  | { id: string; kind: "punchline"; durationInFrames: number; text: string; mediaRef?: string };

export type HighlightBox = { x: number; y: number; w: number; h: number };

export type TrainingScene =
  | { id: string; kind: "before"; durationInFrames: number; caption: string; mediaRef?: string }
  | {
      id: string;
      kind: "step";
      stepNumber: number;
      durationInFrames: number;
      caption: string;
      narrationText?: string;
      mediaRef?: string;
      highlight?: HighlightBox;
    }
  | { id: string; kind: "after"; durationInFrames: number; caption: string; mediaRef?: string };

export type MarketingConfig = {
  mode: "marketing";
  title: string;
  format: Format;
  fps: number;
  durationInFrames: number;
  theme: Theme;
  audio: Audio;
  scenes: MarketingScene[];
};

export type TrainingConfig = {
  mode: "training";
  title: string;
  format: Format;
  fps: number;
  durationInFrames: number;
  theme: Theme;
  audio: Audio;
  scenes: TrainingScene[];
};

export const FORMAT_DIMENSIONS: Record<Format, { width: number; height: number }> = {
  landscape: { width: 1920, height: 1080 },
  vertical: { width: 1080, height: 1920 },
  square: { width: 1080, height: 1080 },
};
