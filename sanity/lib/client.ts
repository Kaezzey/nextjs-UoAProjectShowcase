 import { createClient } from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

// Sanity Image URL Builder
const imageBuilder = createImageUrlBuilder({
  projectId,
  dataset,
})

export function urlFor(source: any) {
  return imageBuilder.image(source)
}
