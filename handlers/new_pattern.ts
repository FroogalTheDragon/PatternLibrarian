import { Conversation } from "grammyjs/conversations";
import { Context, InlineKeyboard } from "grammy";
import { print } from "../utils/print.ts";
import { Tags } from "../enums/Tags.ts";
import { Crochet } from "../types/Crochet.ts";
import { Knit } from "../types/Knit.ts";
import { Difficulty } from "../enums/Difficulty.ts";
import { CrochetTypes } from "../enums/CrochetType.ts";
import { Pattern } from "../classes/Pattern.ts";
import { keyboardFromArray } from "../utils/keyboards.ts";
// import { CrochetHookSizes } from "../enums/Sizes.ts";
import { CrochetStitches } from "../enums/Stitches.ts";
import { downloadFile } from "../utils/misc.ts";
import { HookSizes } from "../enums/Sizes.ts";

export async function new_pattern(
  conversation: Conversation,
  ctx: Context,
  url: string,
) {
  // Create a new pattern object
  const pattern = new Pattern();
  // Get pattern name from user
  await ctx.reply(`Please enter a name for this pattern.`);
  pattern.name = await conversation.form.text();

  // Get pattern description
  await ctx.reply("Give a description for your pattern.");
  pattern.description = await conversation.form.text();

  // Get the tags from the user
  await ctx.reply(
    "Okay select the tags that describe your pattern.  When done click the [CLICK WHEN DONE] button",
  );

  await ctx.reply(
    "Please select the tags you would like to apply to this pattern.",
    {
      reply_markup: keyboardFromArray(Object.values(Tags)).text(
        "[COMPLETE SELECTION]",
      ),
    },
  );

  const tags: string[] = [];
  while (true) {
    const tag = await conversation.form.text();
    if (tag === "[COMPLETE SELECTION]") {
      break;
    } else {
      const tagNames: string[] = Object.values(Tags);
      if (tagNames.includes(tag) && !tags.includes(tag)) {
        print(tag);
        tags.push(tag);
        await ctx.reply(`Tags Applied: ${tags}`);
      } else if (tagNames.includes(tag) && tags.includes(tag)) {
        await ctx.reply(`${tag} has already been applied`);
      } else {
        await ctx.reply(`${tag} is an invalid tag`);
      }
    }
  }
  print(`Tags: ${tags}`);
  pattern.tags = tags as Tags[]; // "as" keyword allows a string[] to be converted to a Tags[]
  await ctx.reply(`Your tags have been applied: ${tags}`);

  // Get craft type from user
  await ctx.reply(`Is this a crochet pattern or knit pattern?`, {
    reply_markup: new InlineKeyboard().text("Crochet").text("Knit"),
  });
  const patternTypeSelection = await conversation.waitFor("callback_query");

  switch (patternTypeSelection.callbackQuery.data?.toLocaleLowerCase()) {
    case "crochet": {
      const crochet: Crochet = {
        hookSizes: [],
        stitches: [],
        difficulty: Difficulty.Beginner,
        crochetType: [],
      };
      const hookSizes: number[] = HookSizes;
      print("this is a crochet pattern");
      // Get Hooksize
      await ctx.reply("What is your hooksize?", {
        reply_markup: keyboardFromArray(hookSizes).text(
          "[COMPLETE SELECTION]",
        ),
      });

      while (true) {
        const hookSize = await conversation.form.text();
        if (
          hookSizes.includes(Number(hookSize)) &&
          !crochet.hookSizes.includes(Number(hookSize))
        ) {
          crochet.hookSizes.push(Number(hookSize));
          await ctx.reply(`Hook size added: ${crochet.hookSizes}`);
        } else if (crochet.hookSizes.includes(Number(hookSize))) {
          await ctx.reply(`Hooksize ${hookSize} already selected, try again.`);
        } else if (hookSize === "[COMPLETE SELECTION]") {
          break;
        } else {
          ctx.reply(`Invalid hooksize ${hookSize}`);
        }
      }

      // Get difficulty
      const difficultyCheckpoint = conversation.checkpoint();
      const difficultyLevels: string[] = Object.values(Difficulty);
      await ctx.reply("Select pattern diffuculty.", {
        reply_markup: keyboardFromArray(difficultyLevels),
      });

      const difficulty = await conversation.form.text();

      if (difficultyLevels.includes(difficulty)) {
        crochet.difficulty = difficulty as Difficulty;
      } else {
        await ctx.reply("Invalid diffuculty, please try again.");
        await conversation.rewind(difficultyCheckpoint);
      }

      // Get stitches
      const stitchNames: string[] = Object.values(CrochetStitches);
      await ctx.reply("What stitches does this pattern use?", {
        reply_markup: keyboardFromArray(stitchNames).text(
          "[COMPLETE SELECTION]",
        ),
      });
      const stitches: string[] = [];
      while (true) {
        const stitch = await conversation.form.text();

        if (stitchNames.includes(stitch)) {
          stitches.push(stitch);
        } else if (stitch === "[COMPLETE SELECTION]") {
          break;
        } else {
          await ctx.reply(`Unknown stitch ${stitch} please try again.`);
        }
        await ctx.reply(`Stitches added: ${stitches}`);
      }

      crochet.stitches = stitches as CrochetStitches[];

      // Get Type of crochet
      const crochetTypes: string[] = Object.values(CrochetTypes);
      await ctx.reply("Select the type of crochet this pattern uses.", {
        reply_markup: keyboardFromArray(crochetTypes),
      });

      const crochetType = await conversation.form.text();

      if (crochetTypes.includes(crochetType)) {
        crochet.crochetType = [crochetType] as CrochetTypes[];
      }

      pattern.craft = crochet;
      if (ctx.from) {
        pattern.userId = ctx.from.id;
      }

      const fileName = `${ctx.from?.id}_${pattern.name}`;

      const patternTmpPath = await downloadFile(url, fileName);

      const patternFilePath = await Deno.realPath(`assets/pattern_files/pdf`);
      const patternFile = `${patternFilePath}/${fileName.replaceAll(" ", "_")}.pdf`;

      await Deno.copyFile(
        patternTmpPath,
        patternFile,
      );

      pattern.timestamp = await conversation.now();
      pattern.patternFilePath = patternFile;
      const reply = await pattern.set();
      if (reply === "OK") {
        await ctx.reply(`Pattern saved successfully!`);
      } else {
        await ctx.reply(`Failed to save pattern: ${reply}`);
        throw new Error(`Failed to save pattern ${pattern.name}: error: ${reply}`);
      }
      break;
    }
    case "knit": {
      print("This is a knit pattern");
      break;
    }
    default: {
      print("Unknown craft");
      await ctx.reply("Unknow craft");
      break;
    }
  }
}
