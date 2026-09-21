import { interpolate, useCurrentFrame } from "remotion";

type Props = {
  /** Fraction of frame height each bar occupies. */
  barHeight?: number;
  color?: string;
};

// Cinematic top/bottom bars — fades in over the first few frames. Used sparingly
// (marketing "cinematic" tone, or a training scene's "before" establishing shot).
export const Letterbox: React.FC<Props> = ({ barHeight = 0.08, color = "#000000" }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const barStyle = {
    position: "absolute" as const,
    left: 0,
    right: 0,
    height: `${barHeight * 100}%`,
    backgroundColor: color,
    opacity,
  };

  return (
    <>
      <div style={{ ...barStyle, top: 0 }} />
      <div style={{ ...barStyle, bottom: 0 }} />
    </>
  );
};
