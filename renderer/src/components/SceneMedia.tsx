import { AbsoluteFill, Img, staticFile } from "remotion";

type Props = {
  /** Path relative to the output folder's staticFiles, as written into composition-config.json. */
  mediaRef?: string;
  backgroundColor: string;
};

// Renders a scene's screenshot/media reference if one was provided, otherwise
// just the theme background — keeps scenes usable even before step 3 has real
// screenshots wired in.
export const SceneMedia: React.FC<Props> = ({ mediaRef, backgroundColor }) => (
  <AbsoluteFill style={{ backgroundColor }}>
    {mediaRef ? (
      <>
        <Img
          src={staticFile(mediaRef)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {/* Legibility scrim for lower-third captions over a busy screenshot. */}
        <AbsoluteFill
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0) 35%)",
          }}
        />
      </>
    ) : null}
  </AbsoluteFill>
);
