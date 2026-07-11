import Benchmark from "benchmark";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, parse } from "node:path";

const require = createRequire(import.meta.url);

const packageVersion = (name) => {
  let directory = dirname(require.resolve(name));
  const root = parse(directory).root;

  while (directory !== root) {
    const packagePath = join(directory, "package.json");
    try {
      const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
      if (packageJson.name === name) return packageJson.version;
    } catch {
      // Keep walking toward the package root.
    }
    directory = dirname(directory);
  }

  return "unknown";
};

console.log(
  JSON.stringify(
    {
      node: process.version,
      platform: `${process.platform}-${process.arch}`,
      packages: {
        "@busbud/tailwind-buddy": packageVersion("@busbud/tailwind-buddy"),
        "class-variance-authority": packageVersion("class-variance-authority"),
        "tailwind-merge": packageVersion("tailwind-merge"),
        "tailwind-variants": packageVersion("tailwind-variants"),
      },
    },
    null,
    2
  )
);

const suite = new Benchmark.Suite();

import * as CVA from "./configs/cva.mjs";
import {
  noSlotsAndCompoundNoTwMergeNoResponsive,
  slotsAndCompoundNoTwMergeNoResponsive,
  v2SetupComposeWithMerge,
} from "./configs/tailwindbuddy.mjs";
import * as TV from "./configs/tv.mjs";
import { twMerge } from "./configs/twMerge.config.mjs";

suite
  // TV - slots false - twMerge no - compound yes
  .add("TV - slots false - twMerge no - compound yes", function () {
    TV.noSlotsAndCompoundNoTwMergeNoResponsive.avatar({ size: "md" });
  })
  .add("CVA - slots false - twMerge no - compound yes", function () {
    CVA.noSlotsAndCompoundNoTwMergeNoResponsive.avatar({ size: "md" });
  })
  .add("TAILWINDBUDDY - slots false - twMerge no - compound yes", function () {
    noSlotsAndCompoundNoTwMergeNoResponsive.avatar.slots.root({
      size: "md",
    });
  })

  //  TV - slots false - twMerge yes - compound yes
  .add("TV - slots false - twMerge yes - compound yes", function () {
    TV.noSlotsCompound.avatar({ size: "md" });
  })
  .add("CVA - slots false - twMerge yes - compound yes", function () {
    twMerge(CVA.noSlotsAndCompoundNoTwMergeNoResponsive.avatar({ size: "md" }));
  })
  .add("TAILWINDBUDDY - slots false - twMerge yes - compound yes", function () {
    twMerge(
      slotsAndCompoundNoTwMergeNoResponsive.avatar.slots.root({
        size: "md",
      })
    );
  })
  // v2 setupCompose path: tailwind-merge injected internally (no external wrap)
  .add(
    "TAILWINDBUDDY v2 setupCompose - twMerge injected - compound yes",
    function () {
      v2SetupComposeWithMerge.avatar.root({
        size: "md",
      });
    }
  )

  .on("cycle", function (event) {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  .run({ async: true });
