import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { build, createServer, loadEnv } from "vite";
import { renderSeoHead, seoSettings } from "./seo.mjs";
import { services } from "../src/services.js";

await build();
const renderer = await createServer({
  appType: "custom",
  server: { middlewareMode: true, hmr: false, watch: null },
});
try {
  const { render } = await renderer.ssrLoadModule("/src/entry-server.jsx");
  const template = await readFile("dist/index.html", "utf8");
  const outlet = '<div id="root"></div>';
  if (!template.includes(outlet)) throw new Error("The HTML rendering outlet was not found.");
  const headPattern = /<!--seo-start-->[\s\S]*?<!--seo-end-->/;
  if (!headPattern.test(template)) throw new Error("The SEO head boundaries were not found.");
  const settings = seoSettings({ ...loadEnv("production", process.cwd(), ""), ...process.env });
  const pages = [
    { path: "/", output: "dist/index.html" },
    ...services.map(({ path }) => ({ path, output: join("dist", path.slice(1), "index.html") })),
    { path: "/404/", output: "dist/404.html" },
  ];
  for (const page of pages) {
    const html = template
      .replace(headPattern, () => renderSeoHead(settings, page.path))
      .replace(outlet, () => `<div id="root">${render(page.path)}</div>`);
    await mkdir(dirname(page.output), { recursive: true });
    await writeFile(page.output, html);
    console.log(`Pre-rendered ${page.path} into ${page.output}.`);
  }
} finally {
  await renderer.close();
}
