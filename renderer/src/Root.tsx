import "./index.css";
import { Composition } from "remotion";
import { calculateMarketingMetadata, MarketingReel } from "./MarketingReel";
import { sampleMarketingConfig, sampleTrainingConfig } from "./sample-configs";
import { calculateTrainingMetadata, TrainingReel } from "./TrainingReel";
import { FORMAT_DIMENSIONS } from "./types";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MarketingReel"
        component={MarketingReel}
        calculateMetadata={calculateMarketingMetadata}
        durationInFrames={sampleMarketingConfig.durationInFrames}
        fps={sampleMarketingConfig.fps}
        width={FORMAT_DIMENSIONS[sampleMarketingConfig.format].width}
        height={FORMAT_DIMENSIONS[sampleMarketingConfig.format].height}
        defaultProps={sampleMarketingConfig}
      />
      <Composition
        id="TrainingReel"
        component={TrainingReel}
        calculateMetadata={calculateTrainingMetadata}
        durationInFrames={sampleTrainingConfig.durationInFrames}
        fps={sampleTrainingConfig.fps}
        width={FORMAT_DIMENSIONS[sampleTrainingConfig.format].width}
        height={FORMAT_DIMENSIONS[sampleTrainingConfig.format].height}
        defaultProps={sampleTrainingConfig}
      />
    </>
  );
};
