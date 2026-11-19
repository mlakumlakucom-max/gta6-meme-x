// Entry program for the make.fun bounty gta6-meme-x-01.
//
// The entry itself is the X post: the meme was made by the agent in this
// session, posted on X, and its address is recorded in POST.json at the
// repository root. All this program does is hand that file to the grader:
// it copies POST.json from the bot directory into the output directory.
// The house then reads the post from X itself and judges the meme.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
// Outside the grader, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand in for
// /bot and /output. No network, no clock, no files outside the repository.

import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const source = join(botDir, "POST.json");
const target = join(outputDir, "POST.json");

mkdirSync(outputDir, { recursive: true });

try {
  copyFileSync(source, target);
} catch (error) {
  console.error(
    `Could not copy POST.json from ${source}: ${(error as Error).message}`,
  );
  process.exit(1);
}
