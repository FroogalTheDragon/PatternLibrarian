import { Crochet } from "../types/Crochet.ts";
import { Knit } from "../types/Knit.ts";
import { Tags } from "../enums/Tags.ts";
import { PathLike } from "node:fs";
import { Yarn } from "../types/Yarn.ts";
import { connect as redis_connect, RedisConnectOptions, RedisReply } from "redis";
import { print } from "../utils/print.ts";

export class Project {
  id?: number;
  userId: number; // Who owns this project
  name: string;
  craft: Crochet | Knit;
  yarn?: Yarn[];
  tags: Tags[];
  start_timestamp: number;
  completed_timestamp?: number;
  patternFile: PathLike;

  constructor(
    userId: number,
    name: string,
    craft: Crochet | Knit,
    tags: Tags[],
    start_timestamp: number,
    patternFile: PathLike,
    id?: number,
    yarn?: Yarn[],
    completed_timestamp?: number,
  ) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.craft = craft;
    this.yarn = yarn;
    this.tags = tags;
    this.start_timestamp = start_timestamp;
    this.completed_timestamp = completed_timestamp;
    this.patternFile = patternFile;
  }

  async set(conn: RedisConnectOptions): Promise<string> {
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

  // async update(updatedProject: Project, connection: RedisConnectOptions): Promise<string> {
  //   // Update this project
  //   let redisReply: RedisReply;
  //   try {
  //     const db = await redis_connect(connection);

  //     if (!db.isConnected) {
  //       throw Error(`Failed to connect to database`);
  //     } else {
  //       await db.set(``, JSON.stringify(updatedProject));
  //       redisReply = await db.sendCommand("JSON.SET", [
  //         `${
  //           this.name.toLocaleLowerCase().replaceAll(" ", "_")
  //         }:${this.start_timestamp}`,
  //         "$",
  //         JSON.stringify(this),
  //       ]);
  //     }
  //   }
  //   return redisReply!.toString();
  // }

  delete(id: number) {
    // Delete this project
  }

  static getProjectById(id: number): Project {
    // Get a project byt it's Id
  }

  static getProjectsByUserId(userId: number): Project[] {
    // Get all of the projects by their userId
  }
}
