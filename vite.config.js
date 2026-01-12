import { defineConfig } from "vite";
import fs from "fs";
import path from "path";

const IGNORED_DIRS = new Set(['node_modules', '.git', 'dist', 'target', '.vscode']);

function getHtmlEntries(dir, baseDir, entries = {}, depth = 0) {
  if (depth > 5 || !fs.existsSync(dir)) return entries;

  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.resolve(dir, file.name);

    if (file.isDirectory()) {
      if (IGNORED_DIRS.has(file.name)) continue;

      if (fs.lstatSync(fullPath).isSymbolicLink()) continue;

      getHtmlEntries(fullPath, baseDir, entries, depth + 1);
    } else if (file.name === "index.html") {
      const relativePath = path.relative(baseDir, path.dirname(fullPath));
      const key = relativePath === "" ? "index" : relativePath.replace(/\\/g, "/");
      entries[key] = fullPath;
    }
  }
  return entries;
}

const pages = getHtmlEntries(path.resolve(__dirname, "src"), path.resolve(__dirname, "src"));
console.log("\x1b[36m%s\x1b[0m", "\n🚀 Vilo Project has " + Object.keys(pages).length + " pages:");
Object.entries(pages).forEach(([name, path]) => {
  console.log(`  \x1b[90m- /${name === 'index' ? '' : name}\x1b[0m`);
});
console.log("");

export default defineConfig({
  root: "src",
  publicDir: "../public",
  base: "/",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: getHtmlEntries(path.resolve(__dirname, "src"), path.resolve(__dirname, "src")),
    },
  },
  plugins: [
    {
      name: "vite-directory-slash-redirect",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          try {
            const rawUrl = req.url.split("?")[0] || "/";

            if (rawUrl === "/" || rawUrl.endsWith("/") || path.extname(rawUrl)) {
              return next();
            }

            const candidate = path.resolve(
              __dirname,
              "src",
              rawUrl.replace(/^\//, ""),
              "index.html"
            );

            if (fs.existsSync(candidate)) {
              res.statusCode = 301;
              res.setHeader("Location", rawUrl + "/");
              return res.end();
            }
          } catch (e) {
            // ignore and continue
          }
          next();
        });
      },
    },
  ],
});