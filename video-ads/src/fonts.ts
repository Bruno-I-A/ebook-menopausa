import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

// Loaded at module level — Remotion handles delayRender/continueRender internally
export const { fontFamily: PLAYFAIR } = loadPlayfair();
export const { fontFamily: INTER } = loadInter();
