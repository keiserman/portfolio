import { createClient } from "@sanity/client";
import { createReadStream } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, "../public");

const client = createClient({
  projectId: "2mmtz5gz",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
});

async function uploadImage(filename) {
  const filePath = resolve(publicDir, filename);
  console.log(`  Uploading image: ${filename}`);
  const asset = await client.assets.upload("image", createReadStream(filePath), {
    filename,
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

async function migrateProjects() {
  console.log("\nMigrating projects...");

  const projects = [
    {
      _type: "project",
      title: "BrandChamp",
      slug: { _type: "slug", current: "brandchamp" },
      tag: ["Development"],
      description:
        "Creating unique and compelling brand identities through innovative design and comprehensive branding strategies that help businesses stand out and succeed.",
      link: "https://www.brandchamp.studio/",
      imageFile: "brandchamp.png",
      order: 1,
    },
    {
      _type: "project",
      title: "Dotsafe",
      slug: { _type: "slug", current: "dotsafe" },
      tag: ["Development"],
      description:
        "Providing cyber insurance solutions to protect businesses from data breaches, ransomware, and cyber threats.",
      link: "https://www.dotsafe.com/",
      imageFile: "dotsafe.png",
      order: 2,
    },
    {
      _type: "project",
      title: "Molten Perceptions",
      slug: { _type: "slug", current: "molten-perceptions" },
      tag: ["Development"],
      description:
        "Shape the way the world perceives you. Creating brands that forge impressions and drive influence.",
      link: "https://www.moltenperceptions.com/",
      imageFile: "molten.png",
      order: 3,
    },
  ];

  for (const { imageFile, ...project } of projects) {
    const image = await uploadImage(imageFile);
    const doc = { ...project, image };
    const result = await client.create(doc);
    console.log(`  Created project: ${project.title} (${result._id})`);
  }
}

async function migrateTestimonials() {
  console.log("\nMigrating testimonials...");

  const testimonials = [
    {
      _type: "testimonial",
      name: "Lorem",
      text: "Working with Kevin was a game-changer for our agency. His attention to detail and commitment to bringing our designs to life exactly as envisioned made him our go-to developer for all our Webflow projects.",
      order: 1,
    },
    {
      _type: "testimonial",
      name: "Lorem",
      text: "Working with Kevin was a game-changer for our agency. His attention to detail and commitment to bringing our designs to life exactly as envisioned made him our go-to developer for all our Webflow projects.",
      order: 2,
    },
    {
      _type: "testimonial",
      name: "Lorem",
      text: "Working with Kevin was a game-changer for our agency. His attention to detail and commitment to bringing our designs to life exactly as envisioned made him our go-to developer for all our Webflow projects.",
      order: 3,
    },
  ];

  for (const testimonial of testimonials) {
    const result = await client.create(testimonial);
    console.log(`  Created testimonial: ${testimonial.name} (${result._id})`);
  }
}

async function main() {
  console.log("Starting migration to Sanity...");
  await migrateProjects();
  await migrateTestimonials();
  console.log("\nMigration complete!");
}

main().catch((err) => {
  console.error("Migration failed:", err.message);
  process.exit(1);
});
