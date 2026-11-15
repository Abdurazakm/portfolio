import { readFile, writeFile } from "node:fs/promises";
import { build, createServer } from "vite";

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
  const html = template.replace(outlet, () => `<div id="root">${render()}</div>`);
  await writeFile("dist/index.html", html);
  console.log("Pre-rendered portfolio content into dist/index.html.");
} finally {
  await renderer.close();
}
