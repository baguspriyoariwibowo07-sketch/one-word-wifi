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

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "Shy";

// The sealed scorer's gate: /output/entry.txt must be UTF-8 text of
// 1 to 20 characters, not only white space. The brief asks for
// exactly one word, so validate the word against the same limits
// before writing — an entry outside the gate is never judged.
function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 20) {
    throw new Error(`word must be 1-20 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("word must not be only whitespace");
  }
  if (/\s/.test(text)) {
    throw new Error("entry must be exactly one word");
  }
}

validateEntry(LINE);

// Write the entry, then read it back and re-validate what actually
// landed on disk: the scorer reads the file, not this source, so the
// file itself is what must stay inside the gate.
function main(): void {
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
  const written = readFileSync(target, "utf8");
  validateEntry(written);
  if (written !== LINE) {
    throw new Error("entry.txt on disk differs from the authored word");
  }
}

main();
