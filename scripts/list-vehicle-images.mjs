import fs from "node:fs";
import path from "node:path";

const vehiclesPath = path.resolve("src/data/vehicles.ts");
const src = fs.readFileSync(vehiclesPath, "utf8");
const ids = [...src.matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1]);
const unique = [...new Set(ids)];
const publicDir = path.resolve("public/vehicles");
const missing = [];
const present = [];
for (const id of unique) {
  const file = path.join(publicDir, `${id}.jpg`);
  if (fs.existsSync(file)) present.push(id);
  else missing.push(id);
}
console.log(
  JSON.stringify(
    { total: unique.length, present: present.length, missingCount: missing.length, missing },
    null,
    2,
  ),
);
fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.resolve("scripts/vehicle-ids.json"), JSON.stringify(unique, null, 2));
