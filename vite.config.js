import { defineConfig } from "vite";
import fs from "fs";
import path from "path";

function resolvePages() {
  const root = path.resolve(__dirname, "src");
  const pages = { index: path.resolve(root, "index.html") };

  // include any folder under src that contains index.html (e.g. src/product/index.html)
  for (const name of fs.readdirSync(root, { withFileTypes: true })) {
    if (!name.isDirectory()) continue;
    const indexPath = path.resolve(root, name.name, "index.html");
    if (fs.existsSync(indexPath)) pages[name.name] = indexPath;
  }

  return pages;
}

export default defineConfig({
  root: "src",
  publicDir: "../public",
  base: "/",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: resolvePages(),
    },
  },
  plugins: [
    {
      name: "vite-directory-slash-redirect",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          try {
            const rawUrl = req.url.split("?")[0] || "/";
            // skip if already has a trailing slash or has an extension
            if (rawUrl.endsWith("/") || path.extname(rawUrl)) return next();

            // check if src/<rawUrl>/index.html exists
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
