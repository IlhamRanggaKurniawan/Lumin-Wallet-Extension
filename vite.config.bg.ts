import { defineConfig } from "vite"
import path from "path"

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/background.ts"),
      formats: ["cjs"],
      fileName: () => "background.js",
    },
    outDir: "dist",
    emptyOutDir: false,
  },
})
