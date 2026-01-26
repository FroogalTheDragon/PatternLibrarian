import { Bot, Context } from "grammy";
import { downloadFile, fileType } from "./utils/misc.ts";
import { print } from "./utils/print.ts";
import {
  type Conversation,
  type ConversationFlavor,
  conversations,
  createConversation,
} from "grammyjs/conversations";
import { new_pattern } from "./handlers/new_pattern.ts";

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  type PatternLibrarianContext = Context & ConversationFlavor<Context>;
  const PatternLibrarian = new Bot<PatternLibrarianContext>(
    Deno.env.get("TELEGRAM_BOT_KEY") || "",
  );
  PatternLibrarian.use(conversations());
  PatternLibrarian.use(createConversation(new_pattern));

  PatternLibrarian.command("start", async (ctx) => {
    await ctx.reply("Hello!");
  });

  PatternLibrarian.on("message:file", async (ctx) => {
    const file = await ctx.getFile();
    if (file) {
      switch (fileType(file.file_path!)) {
        case "pdf": {
          const fileUrl =
            `https://api.telegram.org/file/bot${PatternLibrarian.token}/${file.file_path}`;
          await ctx.conversation.enter("new_pattern", fileUrl);
          const patternFilePath = await downloadFile(
            fileUrl,
            `${ctx.from.id}.pdf`,
          );
          await Deno.copyFile(
            patternFilePath,
            "./assets/pattern_files/pdf/beans.pdf",
          );
          break;
        }
        case "txt": {
          await ctx.reply("You sent a text file!");
          break;
        }
        default: {
          await ctx.reply(
            "Invalid file type detected, I can only accept PDF or Text files.",
          );
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
