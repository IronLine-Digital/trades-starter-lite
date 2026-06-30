import type {PortableTextBlock} from '@portabletext/types'

export interface SanityImage {
  asset?: {
    _id: string
    url: string
    metadata?: {
      lqip?: string
      dimensions?: {width: number; height: number; aspectRatio: number}
    }
  }
  hotspot?: {x: number; y: number; height: number; width: number}
  crop?: {top: number; bottom: number; left: number; right: number}
  alt?: string
}

export interface Address {
  street?: string
  city?: string
  state?: string
  zip?: string
}

export interface DayHours {
  closed?: boolean
  open?: string
  close?: string
}

export interface Hours {
  monday?: DayHours
  tuesday?: DayHours
  wednesday?: DayHours
  thursday?: DayHours
  friday?: DayHours
  saturday?: DayHours
  sunday?: DayHours
}

export interface Social {
  facebook?: string
  instagram?: string
  google?: string
}

export interface BusinessInfo {
  businessName: string
  tagline?: string
  logo?: SanityImage
  tradeType?: string
  phone: string
  email?: string
  address?: Address
  serviceAreas?: string[]
  hours?: Hours
  licenseNumber?: string
  insured?: boolean
  social?: Social
}

export interface Service {
  _id: string
  name: string
  slug: string
  shortDescription?: string
  description?: PortableTextBlock[]
  featuredImage?: SanityImage
  icon?: string
  category?: string
  featured?: boolean
  order?: number
}

export interface Project {
  _id: string
  title: string
  slug: string
  featuredImage?: SanityImage
  gallery?: SanityImage[]
  description?: PortableTextBlock[]
  category?: string
  city?: string
  completedDate?: string
  featured?: boolean
}

export interface JobPosting {
  _id: string
  title: string
  slug: string
  employmentType?: string
  location?: string
  description?: PortableTextBlock[]
  requirements?: string[]
}
