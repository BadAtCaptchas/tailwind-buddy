// generate-safelist.js
import { generateSafeList } from "@busbud/tailwind-buddy";
import {
  screens,
  buttonVariants,
} from "./src/components/Button/Button.variants.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const safelist = generateSafeList([buttonVariants], screens);

const fileContent = `// Auto-generated file - DO NOT EDIT
// Run \`pnpm safelist-generation\` to refresh this deterministic output.

export default ${JSON.stringify(safelist, null, 2)};
`;

fs.writeFileSync(
  path.resolve(__dirname, "generated-safelist.ts"),
  fileContent,
  "utf-8"
);

console.log("Safelist generated successfully!");
