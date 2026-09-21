import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import type { CalculateMetadataFunction } from "remotion";
import { Caption } from "./components/Caption";
import { MusicBed } from "./components/MusicBed";
import { SceneFade } from "./components/SceneFade";
import { SceneMedia } from "./components/SceneMedia";
import { textDirectionStyle } from "./theme";
import { FORMAT_DIMENSIONS, type MarketingConfig } from "./types";

export const marketingReelDurationInFrames = (config: MarketingConfig) =>
  config.scenes.reduce((sum, scene) => sum + scene.durationInFrames, 0);

export const calculateMarketingMetadata: CalculateMetadataFunction<MarketingConfig> = ({
  props,
}) => {
  const { width, height } = FORMAT_DIMENSIONS[props.format];
  return {
    fps: props.fps,
    width,
    height,
    durationInFrames: marketingReelDurationInFrames(props),
  };
};

export const MarketingReel: React.FC<MarketingConfig> = ({ theme, audio, scenes }) => {
  let elapsed = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.backgroundColor }}>
      {audio.musicTrack ? <MusicBed track={audio.musicTrack} volume={audio.musicVolume} /> : null}

      {scenes.map((scene) => {
        const from = elapsed;
        elapsed += scene.durationInFrames;

        return (
          <Sequence key={scene.id} from={from} durationInFrames={scene.durationInFrames}>
            <SceneFade durationInFrames={scene.durationInFrames}>
              <SceneMedia mediaRef={scene.mediaRef} backgroundColor={theme.backgroundColor} />

              <div style={textDirectionStyle(theme.rtl)}>
                <Caption
                  text={scene.text}
                  theme={theme}
                  position="center"
                  size={scene.kind === "hook" || scene.kind === "punchline" ? "hero" : "body"}
                />
              </div>

              {audio.sfxEnabled && scene.kind === "highlight" && scene.sfxCue ? (
                <Audio src={staticFile(scene.sfxCue)} />
              ) : null}
            </SceneFade>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
