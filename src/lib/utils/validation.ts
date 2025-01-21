import { z } from 'zod';

export const emailSchema = z
  .string()
  .email('Invalid email address')
  .min(1, 'Email is required');

export const timeSlotSchema = z.object({
  id: z.string(),
  start: z.string().datetime(),
  end: z.string().datetime()
}).refine(
  (data) => new Date(data.start) < new Date(data.end),
  'End time must be after start time'
);

export const availabilitySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: emailSchema,
  timeSlots: z.array(z.object({
    slotId: z.string(),
    isAvailable: z.boolean()
  })).min(1, 'At least one time slot must be selected')
});

export const userSettingsSchema = z.object({
  timezone: z.string().min(1, 'Timezone is required'),
  defaultDuration: z.number().min(15).max(240),
  workingHours: z.object({
    start: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    end: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
  }),
  workingDays: z.array(z.number().min(0).max(6)).min(1)
}); 