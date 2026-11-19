// gta6-meme-x-01: copies the entry's POST.json (the X post address)
// to /output/POST.json, where the make.fun harness reads it.
// Run from the repository root with: node main.ts
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const inputPath = "POST.json";
const outputPath = "/output/POST.json";

try {
  const content = readFileSync(inputPath, "utf8");
  const post = JSON.parse(content) as { url?: string };
  if (typeof post.url !== "string" || post.url.length === 0) {
    console.error("Error: POST.json does not contain a post URL.");
    process.exit(1);
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync(outputPath, content);
  console.log(`POST.json copied to /output/POST.json (${post.url})`);
} catch (err) {
  const error = err as NodeJS.ErrnoException;
  if (error.code === "ENOENT") {
    console.error("Error: POST.json not found in the repository root.");
  } else if (err instanceof SyntaxError) {
    console.error("Error: POST.json is not valid JSON.");
  } else {
    console.error(`Error: ${error.message}`);
  }
  process.exit(1);
}
