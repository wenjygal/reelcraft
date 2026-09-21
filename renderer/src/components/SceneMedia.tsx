import { AbsoluteFill, Img, staticFile } from "remotion";

type Props = {
  /** Path relative to the output folder's staticFiles, as written into composition-config.json. */
  mediaRef?: string;
  backgroundColor: string;
};

// Renders a scene's screenshot as a framed card (rounded corners, shadow)
// floating on the theme background — a raw full-bleed screenshot filling the
// entire frame reads as "someone forgot to design this"; a framed card reads
// as an intentional product shot. No fixed aspect ratio here: screenshots
// should be pre-cropped tight to their actual content before being referenced
// (a full, uncropped mobile-viewport capture is mostly dead background —
// crop it in step 3, not here). Height is "auto" so each image — cropped to
// whatever its own content needs — displays at its true proportions instead
// of being forced into one shared box (forcing a mismatched shape crops
// arbitrary content; found that the hard way once already).
export const SceneMedia: React.FC<Props> = ({ mediaRef, backgroundColor }) => (
  <AbsoluteFill style={{ backgroundColor }}>
    {mediaRef ? (
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "10%",
          width: "80%",
          transform: "translateX(-50%)",
          borderRadius: 40,
          overflow: "hidden",
          boxShadow: "0 30px 60px rgba(0,0,0,0.25)",
        }}
      >
        <Img src={staticFile(mediaRef)} style={{ width: "100%", height: "auto", display: "block" }} />
      </div>
    ) : null}
  </AbsoluteFill>
);
