import { Difficulty } from "../enums/Difficulty.ts";
import { KnitStitch } from "../enums/Stitches.ts";

export type Knit = {
    needleSizes: number[],
    stitches: KnitStitch[],
    difficulty: Difficulty
};