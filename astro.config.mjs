import { defineConfig } from "astro/config";
import DecapCMS from "astro-decap-cms";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

export default defineConfig({
  integrations: [
    tailwind(),
    icon(),
    DecapCMS({
      config: {
        backend: {
          name: "git-gateway",
          branch: "main",
        },
        collections: [
          {
            name: "projects",
            label: "Projects",
            folder: "src/content/projects",
            create: true,
            delete: true,
            fields: [
              { name: "title", widget: "string", label: "Title" },
              { name: "tag", widget: "string", label: "Tag" },
              { name: "description", widget: "string", label: "Description" },
              { name: "image", widget: "image", label: "Image" },
            ],
          },
        ],
      },
    }),
  ],
});
