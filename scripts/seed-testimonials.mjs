import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "2mmtz5gz",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: "skdHeZ8KflLbg9mpgDfvXgYPAjUWiRvAV5oPKxNysUUFFq68y09AZunmtSkGA3Rmd1I7EzwN3SSKQZbJg",
  useCdn: false,
});

const testimonials = [
  {
    _type: "testimonial",
    order: 1,
    name: "James Calloway",
    role: "Creative Director, Harbour Studio",
    text: "Kevin is the only Webflow dev I trust with client work. He reads a Figma file like a designer, asks exactly the right questions upfront, and delivers builds that don't need a single revision on handoff. He's become an essential part of how we deliver.",
  },
  {
    _type: "testimonial",
    order: 2,
    name: "Sara Nkemdirim",
    role: "Founder, Outline Agency",
    text: "We've worked with a lot of Webflow developers and Kevin is genuinely in a different tier. The attention to detail — animations, responsive behaviour, CMS structure — is exceptional. Our clients always comment on how polished everything feels.",
  },
  {
    _type: "testimonial",
    order: 3,
    name: "Tom Eriksen",
    role: "Head of Delivery, Forma Studio",
    text: "Clear scope, realistic timelines, no surprises. Kevin communicates well, flags issues early, and hands off clean projects every time. Exactly what you need from a development partner when you're juggling multiple client accounts.",
  },
  {
    _type: "testimonial",
    order: 4,
    name: "Priya Menon",
    role: "Brand Strategy Lead, Acre Creative",
    text: "We brought Kevin in on a complex multi-brand Webflow build with tight deadlines. He handled the complexity without breaking a sweat and kept us in the loop throughout. The site launched on time and our client was thrilled.",
  },
];

console.log("Seeding testimonials...");

for (const testimonial of testimonials) {
  const result = await client.create(testimonial);
  console.log(`✓ Created: ${result.name}`);
}

console.log("Done!");
