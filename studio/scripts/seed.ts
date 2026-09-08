/**
 * Seed the dataset with a fictional electrician ("Brightwork Electric") so a
 * fresh clone shows a populated site.
 *
 *   npm run seed          # after `sanity login`
 *   # or headless/CI:
 *   SANITY_AUTH_TOKEN=<editor-token> npx sanity exec scripts/seed.ts --with-user-token
 *
 * ⚠ THIS IS DESTRUCTIVE. Every document uses a fixed _id and createOrReplace,
 * so a second run overwrites whatever now lives at those ids — including the
 * `businessInfo` singleton that holds your business name, phone, address and
 * license number. It is meant for a FRESH, EMPTY dataset only.
 *
 * To make that safe, the script refuses to run when the target dataset already
 * looks like a real site: documents it did not create, saved form submissions,
 * or a businessInfo whose name is no longer the demo value. Override with
 * `SEED_FORCE=1` only when you genuinely want the demo content back.
 *
 * No images. Service and project cards render without a `featuredImage` by
 * design — services fall back to their Lucide icon — so the demo shows real
 * layout instead of stock photos that have nothing to do with the work. Add
 * your own in the Studio. This also keeps seeding offline-safe and instant.
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-02-01'})

/** The only ids this script owns. Anything else in the dataset is the user's. */
const SEED_IDS = [
  'businessInfo',
  'service-panel-upgrades',
  'service-ev-chargers',
  'service-lighting',
  'service-emergency-repairs',
  'project-service-upgrade',
  'project-recessed-lighting',
  'project-tenant-fitup',
  'job-licensed-electrician',
  'job-apprentice-electrician',
]

/** Content types this script writes — the ones a re-run would clobber. */
const MANAGED_TYPES = ['businessInfo', 'service', 'project', 'jobPosting']

/** Not overwritten, but their presence means the site is live and collecting leads. */
const SUBMISSION_TYPES = ['contactSubmission', 'applicationSubmission']

const SEED_BUSINESS_NAME = 'Brightwork Electric'

const forced = process.env.SEED_FORCE === '1' || process.argv.includes('--force')

/**
 * Refuse to overwrite a dataset that already holds real content. Runs before
 * any write, so a blocked run leaves the dataset untouched.
 */
async function assertSafeToSeed() {
  const {projectId, dataset} = client.config()
  console.log(`Target: project ${projectId} · dataset ${dataset}`)

  const draftIds = SEED_IDS.map((id) => `drafts.${id}`)
  const {ownContent, submissions, businessName} = await client.fetch<{
    ownContent: number
    submissions: number
    businessName: string | null
  }>(
    `{
      "ownContent": count(*[_type in $managed && !(_id in $seedIds) && !(_id in $draftIds)]),
      "submissions": count(*[_type in $submissionTypes]),
      "businessName": *[_id == "businessInfo"][0].businessName
    }`,
    {managed: MANAGED_TYPES, submissionTypes: SUBMISSION_TYPES, seedIds: SEED_IDS, draftIds},
  )

  const reasons: string[] = []
  if (ownContent > 0) {
    reasons.push(`${ownContent} document(s) this seed did not create`)
  }
  if (submissions > 0) {
    reasons.push(`${submissions} saved form submission(s)`)
  }
  if (businessName && businessName !== SEED_BUSINESS_NAME) {
    reasons.push(`businessInfo is "${businessName}", not the demo business`)
  }

  if (reasons.length === 0) return

  if (forced) {
    console.warn('⚠ Dataset is not empty:')
    reasons.forEach((r) => console.warn(`    • ${r}`))
    console.warn('⚠ Overwriting anyway because SEED_FORCE is set.\n')
    return
  }

  console.error('\n✋ Refusing to seed — this dataset already holds real content:\n')
  reasons.forEach((r) => console.error(`    • ${r}`))
  console.error(
    [
      '',
      `Seeding would overwrite the demo ids in project ${projectId} / dataset ${dataset},`,
      'including the businessInfo singleton (business name, phone, address, license).',
      '',
      'If you meant to seed a different dataset, point the CLI at it first:',
      '    npx sanity dataset list',
      '    SANITY_STUDIO_DATASET=<dataset> npm run seed',
      '',
      'If you really do want the demo content back here, re-run with:',
      '    SEED_FORCE=1 npm run seed',
      '',
    ].join('\n'),
  )
  process.exit(1)
}

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

async function seed() {
  await assertSafeToSeed()

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

  // Keep SEED_IDS honest: an id here that the guard doesn't know about would be
  // both unprotected on this run and misread as the user's content on the next.
  const untracked = docs.map((d) => d._id as string).filter((id) => !SEED_IDS.includes(id))
  if (untracked.length > 0) {
    throw new Error(`Add these ids to SEED_IDS before seeding: ${untracked.join(', ')}`)
  }

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
