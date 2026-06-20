const fs = require("fs");
const path = require("path");

const p = path.join(__dirname, "..", "lib", "schemas", "contactSchema.json");
try {
  const raw = fs.readFileSync(p, "utf8");
  const obj = JSON.parse(raw);
  const required = ["@context", "@type", "name", "url"];
  const missing = required.filter((k) => !(k in obj));
  if (missing.length) {
    console.error("Missing required keys in JSON-LD:", missing);
    process.exit(2);
  }
  console.log("JSON-LD looks valid (basic checks passed).");
  process.exit(0);
} catch (err) {
  console.error("Error validating JSON-LD:", err.message);
  process.exit(1);
}
