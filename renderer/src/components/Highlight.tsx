import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { HighlightBox } from "../types";

type Props = {
  box: HighlightBox;
  color?: string;
};

// A pulsing ring drawn around a fractional (0-1) region of the frame — used in
// training scenes to call out the one UI element the caption is talking about.
export const Highlight: React.FC<Props> = ({ box, color = "#ffcc00" }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 12, stiffness: 120 } });
  const scale = interpolate(enter, [0, 1], [0.85, 1]);
  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const pulse = 1 + Math.sin(frame / 6) * 0.02;

  return (
    <div
      style={{
        position: "absolute",
        left: box.x * width,
        top: box.y * height,
        width: box.w * width,
        height: box.h * height,
        border: `4px solid ${color}`,
        borderRadius: 12,
        boxShadow: `0 0 24px ${color}`,
        opacity,
        transform: `scale(${scale * pulse})`,
        transformOrigin: "center",
        pointerEvents: "none",
      }}
    />
  );
};
