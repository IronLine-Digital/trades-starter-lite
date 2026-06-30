/**
 * Seed the dataset with a fictional electrician ("Brightwork Electric") so a
 * fresh clone shows a populated site. Re-runnable: every doc uses a fixed _id
 * and createOrReplace, so running it again resets the demo content.
 *
 *   npm run seed          # after `sanity login`
 *   # or headless/CI:
 *   SANITY_AUTH_TOKEN=<editor-token> npx sanity exec scripts/seed.ts --with-user-token
 *
 * Images are uploaded best-effort from picsum.photos; if a download fails the
 * document is still created (just without that image).
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-02-01'})

let keyCounter = 0
const key = () => `k${keyCounter++}`

// Minimal portable-text helper: one paragraph per string.
function blocks(...paragraphs: string[]) {
  return paragraphs.map((text) => ({
    _type: 'block',
    _key: key(),
    style: 'normal',
    markDefs: [],
    children: [{_type: 'span', _key: key(), text, marks: []}],
  }))
}

async function uploadImage(seed: string, label: string) {
  const url = `https://picsum.photos/seed/${seed}/1600/1200`
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    const asset = await client.assets.upload('image', buf, {filename: `${seed}.jpg`})
    return {_type: 'image', asset: {_type: 'reference', _ref: asset._id}}
  } catch (e) {
    console.warn(`  ⚠ image upload failed (${label}): ${(e as Error).message}`)
    return undefined
  }
}

async function seed() {
  console.log('Uploading images (best-effort)…')
  const [
    svc1Img,
    svc2Img,
    svc3Img,
    svc4Img,
    proj1Img,
    proj1Gal1,
    proj1Gal2,
    proj2Img,
    proj3Img,
  ] = await Promise.all([
    uploadImage('bw-panel', 'service: panel'),
    uploadImage('bw-ev', 'service: ev'),
    uploadImage('bw-lighting', 'service: lighting'),
    uploadImage('bw-repair', 'service: repair'),
    uploadImage('bw-proj1', 'project 1'),
    uploadImage('bw-proj1b', 'project 1 gallery a'),
    uploadImage('bw-proj1c', 'project 1 gallery b'),
    uploadImage('bw-proj2', 'project 2'),
    uploadImage('bw-proj3', 'project 3'),
  ])

  const docs: any[] = [
    {
      _id: 'businessInfo',
      _type: 'businessInfo',
      businessName: 'Brightwork Electric',
      tagline: 'Licensed electricians for homes and businesses across the Triangle.',
      tradeType: 'Electrician',
      phone: '(919) 555-0147',
      email: 'office@brightworkelectric.co',
      address: {street: '120 Iron Works Dr', city: 'Raleigh', state: 'NC', zip: '27601'},
      serviceAreas: ['Raleigh', 'Durham', 'Cary', 'Apex', 'Wake Forest', 'Morrisville'],
      hours: {
        monday: {closed: false, open: '08:00', close: '17:00'},
        tuesday: {closed: false, open: '08:00', close: '17:00'},
        wednesday: {closed: false, open: '08:00', close: '17:00'},
        thursday: {closed: false, open: '08:00', close: '17:00'},
        friday: {closed: false, open: '08:00', close: '17:00'},
        saturday: {closed: false, open: '09:00', close: '13:00'},
        sunday: {closed: true},
      },
      licenseNumber: 'NC-EL-28841',
      insured: true,
      social: {
        facebook: 'https://facebook.com/brightworkelectric',
        instagram: 'https://instagram.com/brightworkelectric',
        google: 'https://g.page/brightworkelectric',
      },
    },

    {
      _id: 'service-panel-upgrades',
      _type: 'service',
      name: 'Panel Upgrades & Replacements',
      slug: {_type: 'slug', current: 'panel-upgrades'},
      shortDescription:
        'Modernize your electrical panel for more capacity, safety, and code compliance.',
      description: blocks(
        'Older homes often run on 60–100 amp panels that struggle with today’s appliances, HVAC, and EV chargers. We upgrade to 200 amp service with labeled breakers and whole-home surge protection.',
        'Every upgrade is permitted and inspected, and we leave the work area cleaner than we found it.',
      ),
      icon: 'Gauge',
      category: 'Residential',
      featured: true,
      order: 0,
      ...(svc1Img ? {featuredImage: svc1Img} : {}),
    },
    {
      _id: 'service-ev-chargers',
      _type: 'service',
      name: 'EV Charger Installation',
      slug: {_type: 'slug', current: 'ev-charger-installation'},
      shortDescription: 'Level 2 home charging installed cleanly and to code, usually in a day.',
      description: blocks(
        'We install Level 2 EV chargers for all major brands, size the circuit correctly, and place the unit where it’s convenient to plug in.',
        'Ask us about load calculations and panel capacity before you buy a charger — we’ll make sure it fits.',
      ),
      icon: 'Zap',
      category: 'Residential',
      featured: true,
      order: 1,
      ...(svc2Img ? {featuredImage: svc2Img} : {}),
    },
    {
      _id: 'service-lighting',
      _type: 'service',
      name: 'Lighting & Fixtures',
      slug: {_type: 'slug', current: 'lighting-and-fixtures'},
      shortDescription:
        'Recessed lighting, fixtures, dimmers, and smart switches installed right.',
      description: blocks(
        'From a single fixture swap to whole-home recessed lighting plans, we handle layout, dimming, and smart controls so the result looks intentional.',
      ),
      icon: 'Lightbulb',
      category: 'Residential',
      featured: false,
      order: 2,
      ...(svc3Img ? {featuredImage: svc3Img} : {}),
    },
    {
      _id: 'service-emergency-repairs',
      _type: 'service',
      name: 'Emergency Electrical Repairs',
      slug: {_type: 'slug', current: 'emergency-repairs'},
      shortDescription: 'Lost power, tripping breakers, or burning smells? We respond fast.',
      description: blocks(
        'Electrical problems don’t wait for business hours. We troubleshoot dead circuits, failing breakers, and hot outlets, then fix the root cause — not just the symptom.',
      ),
      icon: 'Wrench',
      category: 'Repair',
      featured: true,
      order: 3,
      ...(svc4Img ? {featuredImage: svc4Img} : {}),
    },

    {
      _id: 'project-service-upgrade',
      _type: 'project',
      title: '200A Service Upgrade',
      slug: {_type: 'slug', current: '200a-service-upgrade'},
      category: 'Residential',
      city: 'Raleigh',
      completedDate: '2026-04-18',
      featured: true,
      description: blocks(
        'A 1970s ranch on a 100A panel kept tripping when the AC and oven ran together. We upgraded to a 200A service with a new meter base, grounding, and a labeled 40-space panel.',
      ),
      ...(proj1Img ? {featuredImage: proj1Img} : {}),
      gallery: [proj1Gal1, proj1Gal2]
        .filter(Boolean)
        .map((img) => ({...(img as object), _key: key()})),
    },
    {
      _id: 'project-recessed-lighting',
      _type: 'project',
      title: 'Whole-Home Recessed Lighting',
      slug: {_type: 'slug', current: 'whole-home-recessed-lighting'},
      category: 'Residential',
      city: 'Cary',
      completedDate: '2026-03-02',
      featured: false,
      description: blocks(
        'Replaced dated can lights and added a dimmable recessed layout across the main floor, with smart switches in the kitchen and living room.',
      ),
      ...(proj2Img ? {featuredImage: proj2Img} : {}),
    },
    {
      _id: 'project-tenant-fitup',
      _type: 'project',
      title: 'Commercial Tenant Fit-Up',
      slug: {_type: 'slug', current: 'commercial-tenant-fit-up'},
      category: 'Commercial',
      city: 'Durham',
      completedDate: '2026-01-22',
      featured: true,
      description: blocks(
        'Full electrical fit-up for a 3,200 sq ft retail space: new subpanel, lighting, dedicated circuits, and data rough-in, coordinated around the GC’s schedule.',
      ),
      ...(proj3Img ? {featuredImage: proj3Img} : {}),
    },

    {
      _id: 'job-licensed-electrician',
      _type: 'jobPosting',
      title: 'Licensed Electrician',
      slug: {_type: 'slug', current: 'licensed-electrician'},
      employmentType: 'full_time',
      location: 'Raleigh, NC',
      description: blocks(
        'We’re hiring an experienced, licensed electrician to lead residential and light-commercial jobs. You’ll run service calls and installs with the support of a tight, respectful crew.',
      ),
      requirements: [
        'NC electrical license (or reciprocity) and a clean driving record',
        '3+ years of residential and/or commercial experience',
        'Comfortable reading plans and pulling permits',
        'Customer-friendly and reliable',
      ],
      active: true,
      order: 0,
    },
    {
      _id: 'job-apprentice-electrician',
      _type: 'jobPosting',
      title: 'Apprentice Electrician',
      slug: {_type: 'slug', current: 'apprentice-electrician'},
      employmentType: 'apprenticeship',
      location: 'Raleigh, NC',
      description: blocks(
        'Start your electrical career with hands-on training and a clear path to licensure. We’ll teach the trade the right way — safety first.',
      ),
      requirements: [
        'High school diploma or GED',
        'Reliable transportation and a strong work ethic',
        'Willingness to learn and follow safety procedures',
        'Able to lift 50 lbs and work on your feet',
      ],
      active: true,
      order: 1,
    },
  ]

  const tx = docs.reduce((t, doc) => t.createOrReplace(doc), client.transaction())
  await tx.commit()

  const counts = docs.reduce<Record<string, number>>((acc, d) => {
    const type = d._type as string
    acc[type] = (acc[type] ?? 0) + 1
    return acc
  }, {})
  console.log('✅ Seeded:', JSON.stringify(counts))
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
