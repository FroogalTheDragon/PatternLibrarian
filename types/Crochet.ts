import { CrochetType } from "../enums/CrochetType.ts";
import { Difficulty } from "../enums/Difficulty.ts";
import { CrochetStitch } from "../enums/Stitches.ts";

export type Crochet = {
    hookSizes: number[],
    stitches: CrochetStitch[],
    difficulty: Difficulty,
    crochetType: CrochetType[]
}