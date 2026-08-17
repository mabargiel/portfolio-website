import { defineQuery } from "groq";

const localized = "{ en, pl }";

export const projectsQuery = defineQuery(`
  *[_type == "project"] | order(order asc) {
    _id,
    title${localized},
    kind${localized},
    client,
    period${localized},
    current,
    description${localized},
    outcome${localized},
    stack,
    links[]{ label, url },
    diagram,
    images[]{ alt${localized}, asset->{ _id } }
  }
`);

export const experienceQuery = defineQuery(`
  *[_type == "experience"] | order(order asc) {
    _id,
    role${localized},
    org,
    dateLabel${localized},
    current,
    description${localized}
  }
`);

export const cvQuery = defineQuery(`
  {
    "profile": *[_type == "cv"][0]{
      headline${localized},
      location${localized},
      summary${localized},
      skills[]{ category${localized}, items },
      education[]{ qualification${localized}, school, period },
      languages[]{ name${localized}, level${localized} }
    },
    "roles": *[_type == "experience"] | order(order asc) {
      _id,
      role${localized},
      org,
      location,
      current,
      dateLabel${localized},
      description${localized},
      bullets[]${localized}
    },
    "projects": *[_type == "project" && onCv == true] | order(order asc) {
      _id,
      title${localized},
      kind${localized},
      client,
      period${localized},
      outcome${localized},
      stack,
      links[]{ label, url }
    }
  }
`);
