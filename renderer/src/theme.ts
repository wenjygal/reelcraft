import { loadFont as loadHeebo } from "@remotion/google-fonts/Heebo";
import { loadFont as loadRubik } from "@remotion/google-fonts/Rubik";
import type { CSSProperties } from "react";
import type { Theme } from "./types";

// Load both up front (small, and either may be picked at render time by theme.fontFamily) —
// mirrors the subset/weight choices already proven in remotion-project's FlowEpisode.tsx.
const heebo = loadHeebo("normal", { subsets: ["hebrew"], weights: ["400", "500", "700", "900"] });
const rubik = loadRubik("normal", { subsets: ["hebrew"], weights: ["400", "500", "700", "900"] });

export const resolveFontFamily = (requested: Theme["fontFamily"]): string => {
  if (requested === "Rubik") return rubik.fontFamily;
  if (requested === "Heebo") return heebo.fontFamily;
  // Anything else (a non-Hebrew Google Font name) is trusted as-is —
  // step 3 is responsible for only requesting fonts that make sense for the content.
  return requested;
};

// RTL is per-theme, not per-string-detection — step 3 sets theme.rtl explicitly
// whenever scene text is Hebrew (see step-3-compose.md validation checklist).
export const textDirectionStyle = (rtl: boolean): CSSProperties => ({
  direction: rtl ? "rtl" : "ltr",
  textAlign: rtl ? "right" : "left",
});
