'use server';

import { auth } from '@/auth';
import { writeClient } from '@/sanity/lib/writeClient';
import slugify from 'slugify';

export const createProject = async (_prev: any, form: FormData, tagline: string) => {
  const session = await auth();
  if (!session) return { error: 'Not signed in', status: 'Error' };

  const entries = Object.fromEntries(form.entries());

  const title = entries.title as string;
  const description = entries.description as string;
  const category = entries.category as string; // Already correctly capitalized
  const imageFile = entries.imageFile as unknown as File;

  const slug = slugify(title, { lower: true, strict: true });

  try {
    const uploadedAsset = await writeClient.assets.upload('image', imageFile, {
      filename: imageFile.name,
      contentType: imageFile.type,
    });

    const doc = {
      _type: 'project',
      title,
      description,
      category,
      slug: {
        _type: 'slug',
        current: slug,
      },
      author: {
        _type: 'reference',
        _ref: session.id,
      },
      tagline,
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: uploadedAsset._id,
        },
      },
    };

    const created = await writeClient.create(doc);
return created; 
  } catch (error) {
    console.error(error);
    return { error: JSON.stringify(error), status: 'Error' };
  }
};
