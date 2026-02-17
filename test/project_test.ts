import { assertEquals } from "@std/assert";
import { Project } from "../classes/Project.ts";
import { Difficulty } from "../enums/Difficulty.ts";
import { Tags } from "../enums/Tags.ts";
import { CrochetStitch } from "../enums/Stitches.ts";
import { RedisConnectOptions } from "https://deno.land/x/redis@v0.40.0/mod.ts";

const testProject = new Project(
  12345,
  "Test Project",
  {
    hookSizes: 3.25,
    difficulty: Difficulty.Easy,
    stitches: [CrochetStitch.BackPostDoubleCrochet, CrochetStitch.Bullion],
  },
  [Tags.Amigurumi, Tags.Keychain],
  Date.now(),
  "/path/to/pattern/file.pdf",
  1,
  [{
    brand: "Test Yarn",
    name: "Test Yarn Name",
    color: "green",
  }],
  Date.now(),
);

Deno.test("Test Project.set()", async () => {
  const connection: RedisConnectOptions = {
    hostname: "127.0.0.1",
    port: 6379,
  };

  assertEquals(await testProject.set(connection), "OK");
});
