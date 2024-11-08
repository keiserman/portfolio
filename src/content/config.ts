import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  schema: ({ image }) => z.object({
    title: z.string(),
    tag: z.string(),
    description: z.string(),
    image: z.string(),
  }),
});

export const collections = {
  projects: projects,
};