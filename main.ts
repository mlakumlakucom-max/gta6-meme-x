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

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const source = join(botDir, "POST.json");
const target = join(outputDir, "POST.json");

// A valid entry points at one public X post:
// https://x.com/<handle>/status/<digits>
const POST_URL_PATTERN = /^https:\/\/x\.com\/[^/]+\/status\/\d+$/;

function fail(message: string): never {
  console.error(`Invalid POST.json (${source}): ${message}`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });

let raw: string;
try {
  raw = readFileSync(source, "utf8");
} catch (error) {
  console.error(
    `Could not read POST.json from ${source}: ${(error as Error).message}`,
  );
  process.exit(1);
}

if (raw.trim() === "") {
  fail("file is empty");
}

let data: unknown;
try {
  data = JSON.parse(raw);
} catch (error) {
  fail(`not valid JSON: ${(error as Error).message}`);
}

if (typeof data !== "object" || data === null || Array.isArray(data)) {
  fail("must be a JSON object with a \"url\" field");
}
if (typeof (data as { url?: unknown }).url !== "string") {
  fail("missing or non-string \"url\" field");
}
const url = (data as { url: string }).url;
if (!POST_URL_PATTERN.test(url)) {
  fail(`"url" must look like https://x.com/<handle>/status/<digits>, got ${url}`);
}

// The bytes are handed to the grader exactly as they are in the
// repository: write the original text, not a re-serialised copy.
try {
  writeFileSync(target, raw);
} catch (error) {
  console.error(
    `Could not write POST.json to ${target}: ${(error as Error).message}`,
  );
  process.exit(1);
}
