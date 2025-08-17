import { z, defineCollection } from 'astro:content';

const metadataDefinition = () => {
  return z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),
      canonical: z.string().url().optional(),
      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),
      description: z.string().optional(),
      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              })
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),
      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional();
};

const postCollection = defineCollection({
  schema: z.object({
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    draft: z.boolean().optional(),

    title: z.string(),
    excerpt: z.string().optional(),
    image: z.string().optional(),

    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),

    // Series support
    series: z.string().optional(),
    seriesOrder: z.number().optional(),

    // Content metadata
    prerequisites: z.array(z.string()).optional(),
    externalLinks: z
      .array(
        z.object({
          title: z.string(),
          url: z.string().url(),
          description: z.string().optional(),
        })
      )
      .optional(),
    featured: z.boolean().optional(),

    metadata: metadataDefinition(),
  }),
});

export const collections = {
  post: postCollection,
};
