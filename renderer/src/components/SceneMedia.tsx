import { AbsoluteFill, Img, staticFile } from "remotion";

type Props = {
  /** Path relative to the output folder's staticFiles, as written into composition-config.json. */
  mediaRef?: string;
  backgroundColor: string;
};

// Renders a scene's screenshot as a framed card (rounded corners, shadow)
// floating on the theme background — a raw full-bleed screenshot filling the
// entire frame reads as "someone forgot to design this"; a framed card reads
// as an intentional product shot. The card keeps the screenshot's real 9:16
// phone aspect ratio (our screenshots are all 1080x1920) instead of a fixed
// box shape — cropping to a mismatched aspect ratio cuts off arbitrary content
// (found the hard way: it sliced the mascot off at the edge). Leaves clear
// space below for Caption (see MarketingReel/TrainingReel, which switch
// caption position to sit there rather than overlaying text on the image).
export const SceneMedia: React.FC<Props> = ({ mediaRef, backgroundColor }) => (
  <AbsoluteFill style={{ backgroundColor }}>
    {mediaRef ? (
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "6%",
          width: "58%",
          // Matches the actual screenshot dimensions (1080x1920 captures,
          // cropped to 1080x1860 to remove a "Made with Lovable" badge) —
          // not a generic 9:16 guess, so objectFit: cover below never has to
          // crop real content to force a mismatched shape.
          aspectRatio: "1080 / 1860",
          transform: "translateX(-50%)",
          borderRadius: 40,
          overflow: "hidden",
          boxShadow: "0 30px 60px rgba(0,0,0,0.25)",
        }}
      >
        <Img
          src={staticFile(mediaRef)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    ) : null}
  </AbsoluteFill>
);
