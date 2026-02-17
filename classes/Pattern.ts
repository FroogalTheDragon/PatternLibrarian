import { Tags } from "../enums/Tags.ts";
import { Crochet } from "../types/Crochet.ts";
import { Knit } from "../types/Knit.ts";
import { print } from "../utils/print.ts";

/**
 * This class represents either a crochet pattern or a knit pattern
 */
export class Pattern {
    id?: number;
    userId?: number;
    name?: string;
    description?: string;
    craft?: Crochet | Knit;
    tags?: Tags[];
    patternFilePath?: string;
    constructor(
        id?: number,
        userId?: number,
        name?: string,
        description?: string,
        craft?: Crochet | Knit,
        tags?: Tags[],
        patternFilePath?: string
    ) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.description = description;
        this.craft = craft;
        this.tags = tags;
        this.patternFilePath = patternFilePath;
    }

    set() {
      print(`Set ${this}`);
    }

    async delete() {}
}
