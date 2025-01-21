import { z } from 'zod';

export const timeSlotSchema = z.object({
  id: z.string(),
  start: z.string().datetime(),
  end: z.string().datetime()
});

export const meetingSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  timeSlots: z.array(timeSlotSchema).min(1, 'At least one time slot is required')
}); 