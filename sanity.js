import {
  createCurrentUserHook,
  createClient,
} from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: '2021-03-25',

  useCdn: process.env.NODE_ENV === 'production',
}

// Set up the client
export const sanityClient = createClient(config)

// Set up helper function for generating image Url with only the asset ref data
export const urlFor = (source) => createImageUrlBuilder(config).image(source)

// Helper function to get current user
export const useCurrentUser = createCurrentUserHook(config)
