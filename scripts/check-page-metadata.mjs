import { readFileSync } from "node:fs";

const homepage = readFileSync("dist/client/index.html", "utf8");
const expectedTitle =
  "Mat Lowery | Mathew Lowery | Senior Platform Engineer | Kubernetes, Cloud Infrastructure, Developer Productivity";

if (!homepage.includes(`<title>${expectedTitle}</title>`)) {
  throw new Error(`Homepage title must be: ${expectedTitle}`);
}

if (!homepage.includes('"jobTitle":"Senior Platform Engineer | Kubernetes, Cloud Infrastructure, Developer Productivity"')) {
  throw new Error("Person JSON-LD jobTitle must match DATA.title");
}
