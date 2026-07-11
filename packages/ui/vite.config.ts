import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react(), dts({ bundleTypes: true })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: ["./src/index.ts"],
      name: "uikit",
      // the proper extensions will be added
      fileName: "uikit",
    },
    rolldownOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
