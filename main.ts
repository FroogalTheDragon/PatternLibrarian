import { Bot } from "grammy";
import { downloadFile, fileType } from "./utils/misc.ts";
import { print } from "./utils/print.ts";

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const conn: RedisConnectOptions = {
    hostname: "127.0.0.1",
    port: 6379,
  };
  const PatternLibrarian = new Bot(Deno.env.get("TELEGRAM_BOT_KEY") || "");

  PatternLibrarian.command("start", async (ctx) => {
    await ctx.reply("Hello!");
  });

  PatternLibrarian.on("message:file", async (ctx) => {
    const file = await ctx.getFile();
    if (file) {
      switch (fileType(file.file_path!)) {
        case "pdf": {
          await ctx.reply("You sent a PDF file!");
          const fileUrl = `https://api.telegram.org/file/bot${PatternLibrarian.token}/${file.file_path}`;
          downloadFile(fileUrl, "./assets/pattern_files/pdf/");
          break;
        }
        case "txt": {
          await ctx.reply("You sent a text file!");
          break;
        }
        default: {
          await ctx.reply("Invalid file type detected, I can only accept PDF or Text files.");
        }
      }
    }
  });

  PatternLibrarian.catch((err) => {
    console.error(`Bot Error: ${err.message}`);
  });

  PatternLibrarian.on("message:text", async (ctx) => {
    await ctx.reply("Hello, World!");
  });

  await PatternLibrarian.start();
  // const project = new Project(
  //   22,
  //   "Mark's Beanie",
  //   {
  //     hookSize: 2.3,
  //     stitches: [
  //       CrochetStitch.DoubleCrochet,
  //       CrochetStitch.Cluster,
  //       CrochetStitch.Chain,
  //     ],
  //     difficulty: Difficulty.Easy,
  //   },
  //   [Tags.Amigurumi, Tags.Blanket, Tags.Drink_Accessory],
  //   Date.now(),
  //   "./beans.db",
  // );
  // print(await project.set(conn));
}
