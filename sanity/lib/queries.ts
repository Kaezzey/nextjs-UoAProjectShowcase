import { defineQuery } from "next-sanity";

export const PROJECTS_QUERY = defineQuery(`
    *[_type == 'project' && defined(slug.current) && !defined($search) || title match $search|| category match $search || author -> name match $search ] | order(_createdAt desc){ 
        _id, title, slug, _createdAt, author -> {
            _id, name, image, bio
        }, views, description,
        category, image
    }`
);

export const PROJECT_BY_ID_QUERY = defineQuery(`*[_type == 'project' && _id == $id][0]{
  _id, title, slug, _createdAt, author -> {
    _id, name, username, image, bio
  }, description, views,
    category, image, tagline, content
}
`);

export const PROJECT_VIEWS_QUERY = defineQuery(`
    *[_type == 'project' && _id == $id][0]{
        _id, views
    }
`);

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
    *[_type == 'author' && id == $id][0]{
    _id, id, name, username, email, image, bio}` );

export const AUTHOR_BY_ID_QUERY = defineQuery(`
    *[_type == 'author' && _id == $id][0]{
    _id, id, name, username, email, image, bio}` );

export const STARTUPS_BY_AUTHOR_QUERY = defineQuery(`
    *[_type == 'project' && author._ref == $id] | order(_createdAt desc){ 
        _id, title, slug, _createdAt, author -> {
            _id, name, image, bio
        }, views, description,
        category, image
    }`
);

export const TOP_5_PROJECTS_QUERY = defineQuery(`
  *[_type == "project"] | order(coalesce(views, 0) desc)[0...5] {
    _id,
    title,
    description,
    slug,
    views,
    category,
    image,
    author->{
      _id,
      name,
      username,
      image
    }
  }
`
);