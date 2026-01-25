import { Difficulty } from "../enums/Difficulty.ts";
import { KnitStitch } from "../enums/Stitches.ts";

export type Knit = {
    needle_size: number,
    stitches: KnitStitch[],
    difficulty: Difficulty
};