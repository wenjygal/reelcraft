import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import type { HighlightBox } from "../types";

type Props = {
  /** Points from a fixed screen-edge origin toward the target box's center. */
  target: HighlightBox;
  from?: "top" | "bottom" | "left" | "right";
  color?: string;
};

// A simple animated pointer used alongside Highlight when a training scene needs
// to draw the eye from outside the highlighted region (e.g. a button near an edge).
export const Arrow: React.FC<Props> = ({ target, from = "top", color = "#ffcc00" }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const draw = interpolate(frame, [0, Math.round(fps * 0.4)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const targetX = (target.x + target.w / 2) * width;
  const targetY = (target.y + target.h / 2) * height;
  const originX = from === "left" ? 0 : from === "right" ? width : targetX;
  const originY = from === "top" ? 0 : from === "bottom" ? height : targetY;

  const currentX = interpolate(draw, [0, 1], [originX, targetX]);
  const currentY = interpolate(draw, [0, 1], [originY, targetY]);

  return (
    <svg
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      width={width}
      height={height}
    >
      <line
        x1={originX}
        y1={originY}
        x2={currentX}
        y2={currentY}
        stroke={color}
        strokeWidth={6}
        strokeLinecap="round"
        opacity={draw}
      />
    </svg>
  );
};
