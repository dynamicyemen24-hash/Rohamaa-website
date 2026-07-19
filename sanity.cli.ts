/// <reference types="vite/client" />

/**
 * Sanity CLI Configuration
 * مع TypeGen للأنواع المولدة تلقائياً
 */
import { defineCliConfig } from "sanity/cli";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || "xd0ohyiz";
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  reactStrictMode: true,

  // TypeGen Configuration
  typegen: {
    enabled: true,
    path: "./src/**/*.{ts,tsx}",
    schema: "./schema.json",
    generates: "./src/sanity/types.ts",
    overloadClientMethods: true,
  },
});