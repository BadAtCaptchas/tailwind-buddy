import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [dts({ bundleTypes: true })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: ["./src/main.ts"],
      name: "tailwindbuddy",
      // the proper extensions will be added
      fileName: "tailwindbuddy",
    },
  },
});
