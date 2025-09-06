import { defineConfig } from "vite"
import path from "path"

export default defineConfig({
  build: {
    outDir: "dist", // biar hasilnya tetap di folder dist
    emptyOutDir: false, // jangan hapus hasil build utama
    lib: {
      entry: path.resolve(__dirname, "src/background.ts"),
      formats: ["es"], // biar compatible dengan service_worker type: module
      fileName: () => "background.js",
    },
    rollupOptions: {
      output: {
        manualChunks: undefined, // pastikan single file
      },
    },
  },
})
