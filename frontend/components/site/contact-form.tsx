'use client'

import {type BaseSyntheticEvent} from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {contactSchema, type ContactFormValues} from '@/lib/schemas/contact'
import {useFormSubmit} from '@/lib/use-form-submit'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {FormField} from './form-field'
import {FormSuccess} from './form-success'
import {Loader2} from 'lucide-react'

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {name: '', email: '', phone: '', message: ''},
  })
  const {status, setStatus, errorMessage, submit} = useFormSubmit('/api/contact')

  const onSubmit = async (values: ContactFormValues, event?: BaseSyntheticEvent) => {
    if (await submit(values, event)) reset()
  }

  if (status === 'success') {
    return (
      <FormSuccess
        title="Thanks — we got it."
        message="We'll get back to you within one business day."
        resetLabel="Send another message"
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

      <FormField label="Phone" error={errors.phone?.message} required>
        <Input
          type="tel"
          {...register('phone')}
          aria-invalid={!!errors.phone}
          autoComplete="tel"
          className="h-11"
        />
      </FormField>

      <FormField label="Message" error={errors.message?.message} required>
        <Textarea rows={5} {...register('message')} aria-invalid={!!errors.message} />
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
        disabled={status === 'submitting'}
        className="w-full sm:w-auto"
      >
        {status === 'submitting' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  )
}
