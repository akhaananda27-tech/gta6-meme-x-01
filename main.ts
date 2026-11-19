// gta6-meme-x-01: copies the entry's POST.json (the X post address)
// to <output>/POST.json, where the make.fun harness reads it.
// Run from the repository root with: node main.ts
//
// The grader runs `node /bot/main.ts` from an arbitrary working
// directory, so POST.json is resolved next to this script file
// (via import.meta.url), never relative to the current directory.
// The output directory comes from MAKEFUN_OUTPUT_DIR when set,
// otherwise it defaults to /output.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const inputPath = join(scriptDir, "POST.json");
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outputPath = join(outputDir, "POST.json");

try {
  const content = readFileSync(inputPath, "utf8");
  const post = JSON.parse(content) as { url?: string };
  if (typeof post.url !== "string" || post.url.length === 0) {
    console.error("Error: POST.json does not contain a post URL.");
    process.exit(1);
  }
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputPath, content);
  console.log(`POST.json copied to ${outputPath} (${post.url})`);
} catch (err) {
  const error = err as NodeJS.ErrnoException;
  if (error.code === "ENOENT") {
    console.error(`Error: POST.json not found at ${inputPath}.`);
  } else if (err instanceof SyntaxError) {
    console.error("Error: POST.json is not valid JSON.");
  } else {
    console.error(`Error: ${error.message}`);
  }
  process.exit(1);
}
