import { readFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";

const generatedFiles = [
  new URL("../packages/ui/src/generated/safelist.css", import.meta.url),
  new URL(
    "../packages/vuelib-tailwind4/generated-safelist.ts",
    import.meta.url
  ),
];

const before = await Promise.all(
  generatedFiles.map((file) => readFile(file, "utf8"))
);

const command = process.platform === "win32" ? "cmd.exe" : "pnpm";
const args =
  process.platform === "win32"
    ? ["/d", "/s", "/c", "pnpm generate:safelists"]
    : ["generate:safelists"];

execFileSync(command, args, { stdio: "inherit" });

const after = await Promise.all(
  generatedFiles.map((file) => readFile(file, "utf8"))
);
const changed = generatedFiles.filter(
  (_, index) => before[index] !== after[index]
);

if (changed.length > 0) {
  console.error("Generated safelist files were stale:");
  for (const file of changed) console.error(`- ${file.pathname}`);
  process.exit(1);
}

console.log("Generated safelist files are deterministic and up to date.");
