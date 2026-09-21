import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

const FADE_FRAMES = 10;

// Wraps one scene's content with a short fade-in/out so back-to-back <Sequence>
// cuts (used instead of @remotion/transitions' TransitionSeries, to keep each
// scene's durationInFrames exactly matching composition-config.json — see
// step-3-compose.md's validation rule) don't feel like hard cuts.
export const SceneFade: React.FC<{ durationInFrames: number; children: React.ReactNode }> = ({
  durationInFrames,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fade = Math.min(FADE_FRAMES, Math.round(fps / 3));

  const opacity = interpolate(
    frame,
    [0, fade, durationInFrames - fade, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};
