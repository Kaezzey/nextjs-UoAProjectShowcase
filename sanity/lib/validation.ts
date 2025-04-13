import { z } from 'zod';

export const formSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(20).max(200),
    tagline: z.string().min(10),
    category: z.enum(['technology', 'design', 'education', 'health', 'entertainment'], {
        errorMap: () => ({ message: 'Please select a category' }),
      }),
      imageFile: z
      .custom<File | null>((file) => {
        if (!file) return false; // no file at all
        if (!(file instanceof File)) return false;
        if (!file.type.startsWith('image/')) return false;
        return true;
      }, {
        message: 'Image is required and must be a valid image file',
      }),
  });