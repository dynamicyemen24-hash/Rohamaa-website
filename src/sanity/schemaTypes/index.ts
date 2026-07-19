/**
 * Central Schema Registry
 * يجمع جميع أنواع المحتوى من الملفات المعيارية
 */
import { dashboard } from "../schema";
import { siteSettings } from "../schema";
import { successStory } from "../schema";
import { partner } from "../schema";
import { media } from "../schema";
import { report } from "../schema";
import { contactRequest } from "../schema";
import { volunteer } from "../schema";
import { user } from "../schema";
import { donation } from "../schema";
import { subscriber } from "../schema";
import { video } from "../schema";
import { event } from "../schema";
import { testimonial } from "../schema";
import { faq } from "../schema";

import { newsArticle } from "./documents/news";
import { project } from "./documents/project";
import { linkType } from "./shared/linkType";
import { seoType } from "./shared/seoType";

// Re-export for backward compatibility with existing schema.ts
export {
  dashboard,
  siteSettings,
  project,
  newsArticle,
  successStory,
  partner,
  media,
  report,
  contactRequest,
  volunteer,
  user,
  donation,
  subscriber,
  video,
  event,
  testimonial,
  faq,
  seoType,
  linkType,
};

/**
 * All schema types used in the Studio
 * الترتيب مهم: يجب وضع الأنواع المشتركة (objects) قبل أنواع المستندات
 */
export const schemaTypes = [
  // Shared object types first
  seoType,
  linkType,

  // Document types
  dashboard,
  siteSettings,
  project,
  newsArticle,
  successStory,
  partner,
  media,
  report,
  contactRequest,
  volunteer,
  user,
  donation,
  subscriber,
  video,
  event,
  testimonial,
  faq,
];