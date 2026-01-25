import { Difficulty } from "../enums/Difficulty.ts";
import { CrochetStitch } from "../enums/Stitches.ts";

export type Crochet = {
    hookSize: number,
    stitches: CrochetStitch[],
    difficulty: Difficulty
}