import { z } from 'zod';

export const formSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(20).max(200),
    tagline: z.string().min(10),
    imageFile: z
    .instanceof(File, { message: "Image is required" })
    .refine((file) => file.type.startsWith('image/'), {
        message: 'File must be an image',
    }),
  });