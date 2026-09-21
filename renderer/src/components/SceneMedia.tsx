import { AbsoluteFill, Img, staticFile } from "remotion";

type Props = {
  /** Path relative to the output folder's staticFiles, as written into composition-config.json. */
  mediaRef?: string;
  backgroundColor: string;
};

// Renders a scene's screenshot as a framed card (rounded corners, shadow, ~78%
// width) floating on the theme background — a raw full-bleed screenshot filling
// the entire frame reads as "someone forgot to design this"; a framed card
// reads as an intentional product shot. Leaves the bottom ~18% clear for
// Caption (see MarketingReel/TrainingReel, which switch caption position to
// leave room here rather than overlaying text on the image itself).
export const SceneMedia: React.FC<Props> = ({ mediaRef, backgroundColor }) => (
  <AbsoluteFill style={{ backgroundColor }}>
    {mediaRef ? (
      <div
        style={{
          position: "absolute",
          left: "11%",
          right: "11%",
          top: "10%",
          bottom: "24%",
          borderRadius: 40,
          overflow: "hidden",
          boxShadow: "0 30px 60px rgba(0,0,0,0.25)",
        }}
      >
        <Img
          src={staticFile(mediaRef)}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
        />
      </div>
    ) : null}
  </AbsoluteFill>
);
