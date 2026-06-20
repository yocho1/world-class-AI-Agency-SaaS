const fs = require("fs");
const path = require("path");

const p = path.join(__dirname, "..", "components", "contact", "FAQAccordion.tsx");
const src = fs.readFileSync(p, "utf8");

const checks = [
  { name: "aria-expanded", re: /aria-expanded=/ },
  { name: "aria-controls", re: /aria-controls=/ },
  { name: "role region", re: /role="region"/ },
  { name: "button elements", re: /<button[^>]*>/ },
];

const failed = checks.filter((c) => !c.re.test(src));
if (failed.length) {
  console.error(
    "FAQ accessibility checks failed:",
    failed.map((f) => f.name),
  );
  process.exit(2);
}
console.log("FAQ basic accessibility checks passed.");
process.exit(0);
