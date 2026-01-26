import { Conversation } from "grammyjs/conversations";
import { Context } from "grammy";
import { print } from "../utils/print.ts";

export async function new_pattern(
  conversation: Conversation,
  ctx: Context,
  url: string,
) {
  await ctx.reply(`Please enter a name for this pattern.`);
  const name = await conversation.form.text();

  await ctx.reply(`You named your pattern ${name}`);
  print(url);
}
