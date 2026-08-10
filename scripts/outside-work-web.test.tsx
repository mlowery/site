import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import HomePage from "../src/components/HomePage";

const html = renderToStaticMarkup(<HomePage />);

assert(html.includes('id="outside-work"'), "website should render the Outside Work section");
assert(html.includes("Outside Work"), "website should render the Outside Work heading");
for (const label of [
  "International travel",
  "Cooking across cuisines",
  "Strength training &amp; HIIT",
]) {
  assert(html.includes(label), `website should render Outside Work interest: ${label}`);
}
assert.equal(
  (html.match(/data-outside-work-icon=/g) ?? []).length,
  3,
  "website should render one icon for each Outside Work interest",
);
assert(
  html.indexOf('id="projects"') < html.indexOf('id="outside-work"'),
  "website should render Outside Work after Personal Projects",
);
assert(
  html.indexOf('id="outside-work"') < html.indexOf('id="contact"'),
  "website should render Outside Work before Contact",
);
