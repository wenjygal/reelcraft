import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import type { CalculateMetadataFunction } from "remotion";
import { Arrow } from "./components/Arrow";
import { Caption } from "./components/Caption";
import { Highlight } from "./components/Highlight";
import { MusicBed } from "./components/MusicBed";
import { SceneFade } from "./components/SceneFade";
import { SceneMedia } from "./components/SceneMedia";
import { resolveFontFamily, textDirectionStyle } from "./theme";
import { FORMAT_DIMENSIONS, type TrainingConfig } from "./types";

export const trainingReelDurationInFrames = (config: TrainingConfig) =>
  config.scenes.reduce((sum, scene) => sum + scene.durationInFrames, 0);

export const calculateTrainingMetadata: CalculateMetadataFunction<TrainingConfig> = ({ props }) => {
  const { width, height } = FORMAT_DIMENSIONS[props.format];
  return {
    fps: props.fps,
    width,
    height,
    durationInFrames: trainingReelDurationInFrames(props),
  };
};

const StepBadge: React.FC<{ n: number; theme: TrainingConfig["theme"] }> = ({ n, theme }) => (
  <div
    style={{
      position: "absolute",
      top: 48,
      ...(theme.rtl ? { right: 48 } : { left: 48 }),
      width: 64,
      height: 64,
      borderRadius: "50%",
      backgroundColor: theme.primaryColor,
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: resolveFontFamily(theme.fontFamily),
      fontSize: 32,
      fontWeight: 700,
    }}
  >
    {n}
  </div>
);

export const TrainingReel: React.FC<TrainingConfig> = ({ theme, audio, scenes }) => {
  let elapsed = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.backgroundColor }}>
      {audio.musicTrack ? <MusicBed track={audio.musicTrack} volume={audio.musicVolume} /> : null}

      {scenes.map((scene) => {
        const from = elapsed;
        elapsed += scene.durationInFrames;

        const voiceoverClip = audio.voiceover?.clips.find((c) => c.sceneId === scene.id);

        return (
          <Sequence key={scene.id} from={from} durationInFrames={scene.durationInFrames}>
            <SceneFade durationInFrames={scene.durationInFrames}>
              <SceneMedia mediaRef={scene.mediaRef} backgroundColor={theme.backgroundColor} />

              {scene.kind === "step" ? <StepBadge n={scene.stepNumber} theme={theme} /> : null}

              {scene.kind === "step" && scene.highlight ? (
                <>
                  <Highlight box={scene.highlight} />
                  <Arrow target={scene.highlight} />
                </>
              ) : null}

              <div style={textDirectionStyle(theme.rtl)}>
                <Caption text={scene.caption} theme={theme} position="lower-third" size="body" />
              </div>

              {voiceoverClip ? <Audio src={staticFile(voiceoverClip.audioFile)} /> : null}
            </SceneFade>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
