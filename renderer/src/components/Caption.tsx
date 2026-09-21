import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveFontFamily, textDirectionStyle } from "../theme";
import type { Theme } from "../types";

type Props = {
  text: string;
  theme: Theme;
  /** Position within the frame — training captions usually sit lower-third, marketing hooks are often centered. */
  position?: "center" | "lower-third";
  size?: "hero" | "body";
  /** True when rendered over a screenshot's legibility scrim (see SceneMedia) — switches to white text. */
  overMedia?: boolean;
};

export const Caption: React.FC<Props> = ({
  text,
  theme,
  position = "center",
  size = "hero",
  overMedia = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 200 } });
  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const translateY = interpolate(enter, [0, 1], [16, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: "8%",
        right: "8%",
        ...(position === "center" ? { top: "50%", transform: `translateY(calc(-50% + ${translateY}px))` } : { bottom: "10%" }),
        opacity,
        fontFamily: resolveFontFamily(theme.fontFamily),
        fontSize: size === "hero" ? 72 : 40,
        fontWeight: 700,
        color: overMedia ? "#FFFFFF" : theme.primaryColor,
        textShadow: overMedia ? "0 2px 8px rgba(0,0,0,0.5)" : undefined,
        lineHeight: 1.2,
        ...textDirectionStyle(theme.rtl),
      }}
    >
      {text}
    </div>
  );
};
