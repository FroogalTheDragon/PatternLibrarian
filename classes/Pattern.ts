import { connect } from "https://deno.land/x/redis@v0.40.0/redis.ts";
import { Tags } from "../enums/Tags.ts";
import { Crochet } from "../types/Crochet.ts";
import { Knit } from "../types/Knit.ts";
import { print } from "../utils/print.ts";
import { hostname } from "node:os";

/**
 * This class represents either a crochet pattern or a knit pattern
 */
export class Pattern {
    id?: number;
    userId?: number;
    timestamp?: number;
    modifiedTimestamp?: number;
    name?: string;
    description?: string;
    craft?: Crochet | Knit;
    tags?: Tags[];
    patternFilePath?: string;
    constructor(
        id?: number,
        userId?: number,
        timestamp?: number,
        modifiedTimestamp?: number,
        name?: string,
        description?: string,
        craft?: Crochet | Knit,
        tags?: Tags[],
        patternFilePath?: string
    ) {
        this.id = id;
        this.userId = userId;
        this.timestamp = timestamp;
        this.modifiedTimestamp = modifiedTimestamp;
        this.name = name;
        this.description = description;
        this.craft = craft;
        this.tags = tags;
        this.patternFilePath = patternFilePath;
    }

    /**
     * 
     * @returns Promise<RedisReply>
     */
    async set() {
      const redis = await connect({
        hostname: "127.0.0.1",
        port: 6379
      });

      return await redis.sendCommand(`JSON.SET`, [`${this.userId}:${this.name}:${this.timestamp}`, "$", JSON.stringify(this)]);
    }

    async delete() {}
}
