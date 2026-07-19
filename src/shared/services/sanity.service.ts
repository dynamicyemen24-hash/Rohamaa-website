// Sanity Service - Client for fetching content from Sanity CMS
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'xd0ohyiz';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export const getImageUrl = (source: SanityImageSource) => {
  return builder.image(source).width(800).url();
};

export const sanityService = {
  getClient: () => client,

  getImageUrl: (source: SanityImageSource) => {
    return getImageUrl(source);
  },

  getNews: async () => {
    try {
      const query = `*[_type == "news"] | order(publishDate desc) {
        _id,
        title,
        excerpt,
        category,
        publishDate,
        mainImage,
        views
      }`;
      const items = await client.fetch(query);
      return items || [];
    } catch {
      return [];
    }
  },

  getProjects: async () => {
    try {
      const query = `*[_type == "project"] | order(orderRank) {
        _id,
        title,
        description,
        category,
        status,
        mainImage,
        progress,
        goalAmount,
        raisedAmount
      }`;
      const items = await client.fetch(query);
      return items || [];
    } catch {
      return [];
    }
  },

  getPrograms: async () => {
    try {
      const query = `*[_type == "program"] | order(orderRank) {
        _id,
        title,
        description,
        icon,
        mainImage
      }`;
      const items = await client.fetch(query);
      return items || [];
    } catch {
      return [];
    }
  },

  getSuccessStories: async () => {
    try {
      const query = `*[_type == "successStory"] | order(publishDate desc) {
        _id,
        title,
        story,
        beneficiaryName,
        mainImage,
        publishDate
      }`;
      const items = await client.fetch(query);
      return items || [];
    } catch {
      return [];
    }
  },

  getPartners: async () => {
    try {
      const query = `*[_type == "partner"] | order(orderRank) {
        _id,
        name,
        logo,
        website,
        type
      }`;
      const items = await client.fetch(query);
      return items || [];
    } catch {
      return [];
    }
  },

  getSettings: async () => {
    try {
      const query = `*[_type == "siteSettings"][0]`;
      return await client.fetch(query);
    } catch {
      return null;
    }
  },
};