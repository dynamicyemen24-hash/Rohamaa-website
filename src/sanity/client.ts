// Sanity Client Configuration
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'xd0ohyiz',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  perspective: 'published',
});

export default sanityClient;
