import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tag: z.array(z.enum(["Design", "Development"])),
      description: z.string(),
      image: z.string(),
      link: z.string(),
    }),
});

const testimonials = defineCollection({
  schema: () =>
    z.object({
      name: z.string(),
      text: z.string(),
    }),
});

export const collections = {
  projects: projects,
  testimonials: testimonials,
};
