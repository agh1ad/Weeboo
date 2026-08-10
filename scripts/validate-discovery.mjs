import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pages = [
  ["/", "index.html", "en", "/ar/"],
  ["/about.html", "about.html", "en", "/ar/about.html"],
  ["/services.html", "services.html", "en", "/ar/services.html"],
  ["/how-it-works.html", "how-it-works.html", "en", "/ar/how-it-works.html"],
  ["/contact.html", "contact.html", "en", "/ar/contact.html"],
  ["/our-work.html", "our-work.html", "en", "/ar/our-work.html"],
  ["/work/counselo.html", "work/counselo.html", "en", "/ar/work/counselo.html"],
  ["/terms.html", "terms.html", "en", "/ar/terms.html"],
  ["/privacy.html", "privacy.html", "en", "/ar/privacy.html"],
  ["/ar/", "ar/index.html", "ar", "/"],
  ["/ar/about.html", "ar/about.html", "ar", "/about.html"],
  ["/ar/services.html", "ar/services.html", "ar", "/services.html"],
  ["/ar/how-it-works.html", "ar/how-it-works.html", "ar", "/how-it-works.html"],
  ["/ar/contact.html", "ar/contact.html", "ar", "/contact.html"],
  ["/ar/our-work.html", "ar/our-work.html", "ar", "/our-work.html"],
  ["/ar/work/counselo.html", "ar/work/counselo.html", "ar", "/work/counselo.html"],
  ["/ar/terms.html", "ar/terms.html", "ar", "/terms.html"],
  ["/ar/privacy.html", "ar/privacy.html", "ar", "/privacy.html"],
];
const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

for (const [route, relativePath, language, alternateRoute] of pages) {
  const html = fs.readFileSync(path.join(root, "dist", relativePath), "utf8");
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z0-9#]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];

  assert(new RegExp(`<html[^>]+lang="${language}"`, "i").test(html), `${route}: missing language declaration`);
  if (language === "ar") assert(/<html[^>]+dir="rtl"/i.test(html), `${route}: missing RTL direction`);
  assert(/<title>[^<]{8,}<\/title>/i.test(html), `${route}: missing useful title`);
  assert(/<meta[^>]+name="description"[^>]+content="[^"]{40,}"/i.test(html), `${route}: missing useful meta description`);
  assert(/<meta[^>]+name="robots"[^>]+content="[^"]*index[^"]*follow/i.test(html), `${route}: missing index/follow directive`);
  assert(/<link[^>]+rel="canonical"[^>]+href="https:\/\/weeboo\.com\//i.test(html), `${route}: missing canonical URL`);
  assert(html.includes(`hreflang="${language === "ar" ? "en" : "ar"}" href="https://weeboo.com${alternateRoute}"`), `${route}: missing reciprocal language alternate`);
  assert((html.match(/<h1(?:\s|>)/gi) || []).length === 1, `${route}: expected exactly one H1`);
  assert(/<main(?:\s|>)/i.test(html), `${route}: missing main landmark`);
  assert(text.length >= 500, `${route}: insufficient raw HTML content (${text.length} characters)`);
  assert(schemas.length > 0, `${route}: missing structured data`);
  for (const [, schema] of schemas) {
    try {
      JSON.parse(schema);
    } catch (error) {
      failures.push(`${route}: invalid JSON-LD (${error.message})`);
    }
  }
  for (const match of html.matchAll(/(?:src|href)="(\/(?:assets\/|weeboo-logo)[^"#?]+)"/gi)) {
    assert(
      fs.existsSync(path.join(root, "dist", match[1])),
      `${route}: missing local asset ${match[1]}`,
    );
  }
}

const homepage = fs.readFileSync(path.join(root, "dist", "index.html"), "utf8");
for (const phrase of [
  "One Small Idea.",
  "You don’t need a finished plan",
  "Whatever your idea needs",
  "A clear quote before",
  "Clear answers before",
]) {
  assert(homepage.includes(phrase), `Homepage prerender is missing: ${phrase}`);
}
const arabicHomepage = fs.readFileSync(path.join(root, "dist", "ar", "index.html"), "utf8");
for (const phrase of ["فكرة صغيرة", "لا تحتاج إلى معرفة الصفحات", "مهما كانت فكرتك", "عرض واضح قبل أن"]) {
  assert(arabicHomepage.includes(phrase), `Arabic homepage is missing: ${phrase}`);
}

const sitemap = fs.readFileSync(path.join(root, "dist", "sitemap.xml"), "utf8");
for (const [route] of pages) {
  assert(sitemap.includes(`<loc>https://weeboo.com${route}</loc>`), `Sitemap is missing ${route}`);
}

const robots = fs.readFileSync(path.join(root, "dist", "robots.txt"), "utf8");
assert(robots.includes("Allow: /"), "robots.txt does not allow public crawling");
assert(robots.includes("Sitemap: https://weeboo.com/sitemap.xml"), "robots.txt is missing the sitemap URL");

const llms = fs.readFileSync(path.join(root, "dist", "llms.txt"), "utf8");
assert(llms.includes("https://weeboo.com/services.html"), "llms.txt is missing the services page");
assert(llms.includes("https://weeboo.com/how-it-works.html"), "llms.txt is missing the process page");
assert(fs.existsSync(path.join(root, "dist", "weeboo-logo.webp")), "Structured-data logo is missing");
assert(fs.existsSync(path.join(root, "dist", "favicon.png")), "Browser favicon is missing");

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`Validated crawlable raw HTML, metadata and structured data for ${pages.length} public pages.`);
