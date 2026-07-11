import assert from "node:assert/strict";
import { createRequire } from "node:module";

const expectedExports = ["compose", "generateSafeList", "setupCompose"];
const esm = await import("../dist/tailwindbuddy.js");
const require = createRequire(import.meta.url);
const cjs = require("../dist/tailwindbuddy.umd.cjs");

assert.deepEqual(Object.keys(esm).sort(), expectedExports);
assert.deepEqual(Object.keys(cjs).sort(), expectedExports);

console.log("ESM and CommonJS package entry points expose the expected API.");
