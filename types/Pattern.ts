import { Tags } from "../enums/Tags.ts";
import { Crochet } from "./Crochet.ts";
import { Knit } from "./Knit.ts";
import { RedisReply, connect as redis_connect } from "redis";

// export type Pattern = {
//   id: number;
//   userId: number;
//   craft: Crochet | Knit;
//   tags: Tags[];
//   patternFile: string;
// };

/**
 * This class represents either a crochet pattern or a knit pattern
 */
export class Pattern {
    id: number;
    userId: number;
    craft: Crochet | Knit;
    tags: Tags[];
    patternFile: string;
    constructor(
        id: number,
        userId: number,
        craft: Crochet | Knit,
        tags: Tags[],
        patternFile: string
    ) {
        this.id = id;
        this.userId = userId;
        this.craft = craft;
        this.tags = tags;
        this.patternFile = patternFile;
    }

    async set(): Promise<string> {
        let redisReply: RedisReply;
            // Connect to the db if not connected
            try {
              const db = await redis_connect(conn);
        
              if (!db.isConnected) {
                throw Error(`Failed to connect to database`);
              } else {
                await db.set("beans", JSON.stringify(this));
                redisReply = await db.sendCommand("JSON.SET", [
                  `${this.userId}:${
                    this.name.toLocaleLowerCase().replaceAll(" ", "_")
                  }:${this.start_timestamp}`,
                  "$",
                  JSON.stringify(this),
                ]);
              }
              console.log(db);
              db.close();
            } catch (err) {
              console.error(`Failed to set ${this} because ${err}`);
            }
            return redisReply!.toString();
    }

    static delete() {}
}
