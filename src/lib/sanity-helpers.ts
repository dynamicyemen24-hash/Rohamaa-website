// Sanity helpers for image URLs and content processing
import { getRandomImage } from "@/utils/imageUtils";

const fallbackImages = [
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1642425149556-b6f90e946859?w=800&h=600&fit=crop',
];

export function getSanityImageUrl(
  source: any,
  width: number = 800,
  height: number = 600,
  fallbackCategory?: string
): string {
  // Check if source exists and has valid asset reference
  if (!source || !source.asset || !source.asset._ref) {
    return fallbackCategory 
      ? getRandomImage(fallbackCategory) 
      : fallbackImages[0];
  }

  try {
    // Build Sanity CDN image URL
    const ref = source.asset._ref;
    // Extract image ID from Sanity reference
    const imageId = ref.replace('image-', '');
    
    return `https://cdn.sanity.io/images/xd0ohyiz/production/${imageId}?w=${width}&h=${height}&auto=format&q=85&fit=crop`;
  } catch (error) {
    console.warn('Error building Sanity image URL:', error);
    return fallbackCategory 
      ? getRandomImage(fallbackCategory) 
      : fallbackImages[0];
  }
}

// Helper to process project data for display
export function processProjectData(project: any) {
  const category = project.category || 'عام';
  
  return {
    id: project._id || project.id,
    title: project.title || 'مشروع بدون عنوان',
    description: project.description || project.excerpt || 'لا يوجد وصف متوفر',
    category,
    status: project.status || 'pending',
    beneficiaries: typeof project.beneficiaries === 'number' 
      ? project.beneficiaries.toLocaleString() 
      : project.beneficiaries || '0',
    progress: project.progress || 0,
    location: project.location || 'غير محدد',
    budget: project.budget || 'غير محدد',
    image: project.mainImage 
      ? getSanityImageUrl(project.mainImage, 800, 600, category)
      : getRandomImage(category),
    featured: project.featured || false,
  };
}

export default {
  getSanityImageUrl,
  processProjectData,
};