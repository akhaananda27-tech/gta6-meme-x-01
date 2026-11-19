// Entry program for the GTA 6 meme bounty.
// It copies POST.json (the X post's address) from the repository
// into the output directory, byte for byte. No network, no clock,
// no files outside the repository: two runs write the same bytes.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
const post = readFileSync(join(botDir, "POST.json"));
writeFileSync(join(outDir, "POST.json"), post);
