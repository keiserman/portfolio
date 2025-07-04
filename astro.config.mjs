import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

import alpinejs from "@astrojs/alpinejs";

export default defineConfig({
  integrations: [tailwind(), icon(), alpinejs()],
});