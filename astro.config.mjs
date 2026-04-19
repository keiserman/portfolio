import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import alpinejs from "@astrojs/alpinejs";
import sanity from "@sanity/astro";

const env = loadEnv("", process.cwd(), "PUBLIC_");

export default defineConfig({
  integrations: [
    tailwind(),
    icon(),
    alpinejs(),
    sanity({
      projectId: env.PUBLIC_SANITY_PROJECT_ID,
      dataset: env.PUBLIC_SANITY_DATASET || "production",
      useCdn: true,
      apiVersion: "2024-01-01",
    }),
  ],
});
