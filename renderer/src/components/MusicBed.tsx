import { Audio, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  /** Path relative to the renderer's public/ dir — see assets/README for how vendored tracks are exposed. */
  track: string;
  volume: number;
};

// Frame-based fade-in/out background music bed — same pattern already proven in
// remotion-project's FlowEpisode.tsx (MUSIC_FADE_FRAMES), generalized here.
export const MusicBed: React.FC<Props> = ({ track, volume }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const fadeFrames = Math.round(fps * 1);

  const envelope = interpolate(
    frame,
    [0, fadeFrames, durationInFrames - fadeFrames, durationInFrames],
    [0, volume, volume, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return <Audio src={staticFile(track)} volume={envelope} />;
};
