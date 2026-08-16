import { defineQuery } from "groq";

export const projectsQuery = defineQuery(`
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    kind,
    client,
    period,
    current,
    description,
    outcome,
    stack,
    links[]{ label, url },
    diagram,
    image{
      alt,
      asset->{ url, metadata{ lqip, dimensions{ width, height } } }
    }
  }
`);

export const experienceQuery = defineQuery(`
  *[_type == "experience"] | order(order asc) {
    _id,
    role,
    org,
    dateLabel,
    current,
    description
  }
`);
