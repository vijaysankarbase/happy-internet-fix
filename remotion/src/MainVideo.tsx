import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { PersistentBackground } from "./components/PersistentBackground";
import { Scene1 } from "./scenes/Scene1";
import { Scene2 } from "./scenes/Scene2";
import { Scene3 } from "./scenes/Scene3";
import { Scene4 } from "./scenes/Scene4";
import { Scene5 } from "./scenes/Scene5";
import { Scene6 } from "./scenes/Scene6";
import { Scene7 } from "./scenes/Scene7";

export const MainVideo = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>
      <PersistentBackground />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={120}>
          <Scene1 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />
        <TransitionSeries.Sequence durationInFrames={300}>
          <Scene2 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />
        <TransitionSeries.Sequence durationInFrames={270}>
          <Scene3 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />
        <TransitionSeries.Sequence durationInFrames={270}>
          <Scene4 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />
        <TransitionSeries.Sequence durationInFrames={330}>
          <Scene5 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />
        <TransitionSeries.Sequence durationInFrames={330}>
          <Scene6 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />
        <TransitionSeries.Sequence durationInFrames={270}>
          <Scene7 />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
