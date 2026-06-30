'use client'

import {type BaseSyntheticEvent} from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {applicationSchema, type ApplicationFormValues} from '@/lib/schemas/application'
import {useFormSubmit} from '@/lib/use-form-submit'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {FormField} from './form-field'
import {FormSuccess} from './form-success'
import {Loader2} from 'lucide-react'

export function ApplyForm({positions}: {positions: string[]}) {
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      position: positions[0] ?? '',
      message: '',
    },
  })
  const {status, setStatus, errorMessage, submit} = useFormSubmit('/api/apply')

  const onSubmit = async (values: ApplicationFormValues, event?: BaseSyntheticEvent) => {
    if (await submit(values, event)) reset()
  }

  if (status === 'success') {
    return (
      <FormSuccess
        title="Application received."
        message="Thanks for applying — we'll be in touch if it's a fit."
        resetLabel="Submit another application"
        onReset={() => setStatus('idle')}
      />
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Name" error={errors.name?.message} required>
          <Input {...register('name')} aria-invalid={!!errors.name} autoComplete="name" className="h-11" />
        </FormField>
        <FormField label="Email" error={errors.email?.message} required>
          <Input
            type="email"
            {...register('email')}
            aria-invalid={!!errors.email}
            autoComplete="email"
            className="h-11"
          />
        </FormField>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Phone" error={errors.phone?.message} required>
          <Input
            type="tel"
            {...register('phone')}
            aria-invalid={!!errors.phone}
            autoComplete="tel"
            className="h-11"
          />
        </FormField>
        <FormField label="Position" error={errors.position?.message} required>
          <select
            {...register('position')}
            aria-invalid={!!errors.position}
            className="h-11 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {positions.length === 0 && <option value="">No open positions</option>}
            {positions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <FormField label="Message (optional)" error={errors.message?.message}>
        <Textarea
          rows={5}
          placeholder="Tell us about your experience…"
          {...register('message')}
          aria-invalid={!!errors.message}
        />
      </FormField>

      {status === 'error' && errorMessage && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {errorMessage}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        variant="brand"
        disabled={status === 'submitting' || positions.length === 0}
        className="w-full sm:w-auto"
      >
        {status === 'submitting' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {status === 'submitting' ? 'Submitting…' : 'Submit application'}
      </Button>
    </form>
  )
}
