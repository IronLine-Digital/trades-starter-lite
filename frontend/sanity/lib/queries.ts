import {defineQuery} from 'next-sanity'

// Shared image projection: dereferences the asset and pulls the LQIP blur +
// dimensions so components can render blur placeholders without an extra fetch.
const IMAGE = `{
  "asset": asset->{_id, url, metadata{lqip, dimensions}},
  hotspot,
  crop,
  "alt": coalesce(alt, asset->altText, "")
}`

export const businessInfoQuery = defineQuery(`
  *[_type == "businessInfo"][0]{
    businessName,
    tagline,
    tradeType,
    phone,
    email,
    address,
    serviceAreas,
    hours,
    licenseNumber,
    insured,
    social,
    logo${IMAGE}
  }
`)

export const servicesQuery = defineQuery(`
  *[_type == "service"] | order(featured desc, order asc, name asc){
    _id,
    name,
    "slug": slug.current,
    shortDescription,
    icon,
    category,
    featured,
    order,
    featuredImage${IMAGE}
  }
`)

export const featuredServicesQuery = defineQuery(`
  *[_type == "service"] | order(featured desc, order asc, name asc)[0...6]{
    _id,
    name,
    "slug": slug.current,
    shortDescription,
    icon,
    category,
    featuredImage${IMAGE}
  }
`)

export const projectsQuery = defineQuery(`
  *[_type == "project"] | order(featured desc, completedDate desc){
    _id,
    title,
    "slug": slug.current,
    category,
    city,
    completedDate,
    featured,
    featuredImage${IMAGE}
  }
`)

export const recentProjectsQuery = defineQuery(`
  *[_type == "project"] | order(featured desc, completedDate desc)[0...3]{
    _id,
    title,
    "slug": slug.current,
    category,
    city,
    completedDate,
    featuredImage${IMAGE}
  }
`)

export const activeJobPostingsQuery = defineQuery(`
  *[_type == "jobPosting" && active == true] | order(order asc, _createdAt desc)[0...50]{
    _id,
    title,
    "slug": slug.current,
    employmentType,
    location,
    description,
    requirements
  }
`)
