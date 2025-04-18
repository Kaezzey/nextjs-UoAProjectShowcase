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
    // ✅ Upload image to Sanity
    const uploadedAsset = await writeClient.assets.upload('image', imageFile, {
      filename: imageFile.name,
      contentType: imageFile.type,
    });

    // ✅ Create project document
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

    await writeClient.create(doc);

    return { error: '', status: 'SUCCESS' };
  } catch (error) {
    console.error(error);
    return { error: JSON.stringify(error), status: 'Error' };
  }
};
