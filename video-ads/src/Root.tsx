import React from "react";
import { Composition } from "remotion";
import { Video1 } from "./Video1";
import { Video2 } from "./Video2";
import { Video3 } from "./Video3";

// 15 segundos = 450 frames @ 30fps
// Formato 1:1 (1080×1080) para Feed do Instagram/Facebook
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="V1_QuebraDeCrencia"
        component={Video1}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="V2_Identificacao"
        component={Video2}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="V3_Curiosidade"
        component={Video3}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1080}
      />
    </>
  );
};
