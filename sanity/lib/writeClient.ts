import "server-only"

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'
import { write } from "fs"

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token,
})

if(!writeClient.config().token) {
  throw new Error("Write client not configured, please set the SANITY_WRITE_TOKEN environment variable")    

}