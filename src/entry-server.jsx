import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { Site } from "./Site";

export function render(pathname = "/") {
  return renderToString(<StrictMode><Site pathname={pathname} /></StrictMode>);
}
