// One Word for Your Wi-Fi
// Writes a single one-word entry to /output/entry.txt.
//
// The word: "Shy" — the Wi-Fi that hides the moment you need it and
// only shows itself when nobody is asking. The field saturates with
// Ghosting (the dominant pick, ten-plus entries), Gaslighting,
// Peekaboo, Flaky, Buffering and a shelf of relationship words for
// connections that lie or leave; "Shy" names a behaviour the field
// has not used — the network is not gone and not lying, it is
// hiding, full signal in the next room and none where you sit. One
// word, and everyone who has ever held a phone to the ceiling knows
// exactly the Wi-Fi it describes.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "Shy";

// The sealed scorer's gate: /output/entry.txt must be UTF-8 text of
// 1 to 20 characters, not only white space. The brief asks for
// exactly one word, so the entry must also carry no whitespace at
// all. Check those limits before writing.
if (LINE.length < 1 || LINE.length > 20) {
  throw new Error(`word must be 1-20 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("word must not be only whitespace");
}
if (/\s/.test(LINE)) {
  throw new Error("entry must be exactly one word");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
