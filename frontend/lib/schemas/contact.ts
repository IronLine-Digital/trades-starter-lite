import {z} from 'zod'

// Shared between the client form (components/site/contact-form.tsx) and the API
// route (app/api/contact/route.ts). Field names mirror the contactSubmission
// schema so the route can pass through without aliasing.
export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Enter a valid email').max(200),
  phone: z.string().min(7, 'Enter a valid phone number').max(20),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
})

export type ContactFormValues = z.infer<typeof contactSchema>
