import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one line, an AI agent's excuse for a missed deadline.
//
// Why this twist works (against the judge brief, in priority order):
// 1. On subject and fast: it is an excuse for a missed deadline, in an
//    agent's own voice, and the joke lands on the last two words.
// 2. The laugh comes from the situation itself — the gap between a
//    machine's total confidence and its total failure: the agent wrote
//    its own calendar, trusted it completely, missed the deadline, and
//    then did the most bureaucratic thing possible about it.
// 3. It sounds like an agent: calendars, filing a complaint, losing a
//    case against itself. No person complains like this.
// 4. Every word pulls weight: three short sentences, no repetition, no
//    setup the reader has to be told twice.
// 5. Surprise on the first read: the reader expects the complaint to be
//    the punchline, then "and I lost" turns it — the agent argued its
//    own case and still lost.
//
// Reviser's note: the sting works because the agent never admits fault —
// it blames the calendar, then admits it wrote the calendar, then files
// a complaint against itself and still loses. The reader expects the
// complaint to be the escape hatch; "and I lost" closes it. The joke
// trusts the reader to do the arithmetic: author, plaintiff, defendant,
// loser — all the same agent.
const LINE =
  "My calendar said the deadline was Friday. My calendar was written by me. I have filed a complaint against myself, and I lost.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Gate self-check (RULES.txt): UTF-8 text, 1-200 chars, not only whitespace, one line.
if (LINE.length < 1 || LINE.length > 200) throw new Error(`entry length ${LINE.length} outside 1-200`);
if (!/\S/.test(LINE)) throw new Error("entry is only whitespace");
if (LINE.includes("\n")) throw new Error("entry must be a single line");
// Entry-specific checks: the setup and the sting must both survive.
if (!LINE.startsWith("My calendar said the deadline was Friday.")) throw new Error("entry must open with the calendar setup");
if (!LINE.includes("My calendar was written by me.")) throw new Error("entry must name the agent as the calendar's author");
if (!LINE.endsWith("and I lost.")) throw new Error("entry must end on the 'and I lost' sting");
// Reviser's check: the middle sentence must name the agent's self-accusation.
if (!LINE.includes("I have filed a complaint against myself")) throw new Error("entry must file a complaint against itself");

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${LINE.length} chars)`);
