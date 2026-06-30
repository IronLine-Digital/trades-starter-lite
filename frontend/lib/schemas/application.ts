import {z} from 'zod'

// Shared between the apply form (components/site/apply-form.tsx) and the API
// route (app/api/apply/route.ts). Field names mirror applicationSubmission.
export const applicationSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Enter a valid email').max(200),
  phone: z.string().min(7, 'Enter a valid phone number').max(20),
  position: z.string().min(1, 'Select a position').max(160),
  message: z.string().max(2000).optional(),
})

export type ApplicationFormValues = z.infer<typeof applicationSchema>
