import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary", "html"],
      thresholds: {
        statements: 96,
        branches: 87,
        functions: 97,
        lines: 98,
      },
    },
  },
});
