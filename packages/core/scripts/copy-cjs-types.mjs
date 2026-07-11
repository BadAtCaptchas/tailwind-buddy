import { copyFile } from "node:fs/promises";

await copyFile(
  new URL("../dist/main.d.ts", import.meta.url),
  new URL("../dist/main.d.cts", import.meta.url)
);
