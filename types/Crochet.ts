import { CrochetTypes } from "../enums/CrochetType.ts";
import { Difficulty } from "../enums/Difficulty.ts";
import { CrochetStitches } from "../enums/Stitches.ts";

export type Crochet = {
    hookSizes: number[],
    stitches: CrochetStitches[],
    difficulty: Difficulty,
    crochetType: CrochetTypes[]
}