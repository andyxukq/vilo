import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  base: "/vilo/",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
