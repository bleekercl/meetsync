import { z } from 'zod';
import type { Timestamp } from 'firebase/firestore';
import { APP_CONFIG } from '../constants/config';
import type { TimeSlot } from './common';

/**
 * Represents an attendee's response to a meeting invitation
 */
export interface AttendeeResponse {
  readonly name: string;
  readonly email: string;
  readonly availability: Readonly<Record<string, boolean>>;
  readonly respondedAt: Timestamp;
}

/**
 * Status of a meeting
 */
export type MeetingStatus = 'pending' | 'scheduled' | 'expired';

/**
 * Represents a meeting
 */
export interface Meeting {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly hostId: string;
  readonly timeSlots: ReadonlyArray<TimeSlot>;
  readonly responses: Readonly<Record<string, AttendeeResponse>>;
  readonly status: MeetingStatus;
  readonly createdAt: Timestamp;
  readonly expiresAt: Timestamp;
  readonly scheduledSlotId?: string;
}

/**
 * Schema for validating meeting creation input
 */
export const meetingSchema = z.object({
  title: z.string()
    .min(APP_CONFIG.MEETING.MIN_TITLE_LENGTH, 'Title is too short')
    .max(APP_CONFIG.MEETING.MAX_TITLE_LENGTH, 'Title is too long'),
  description: z.string()
    .max(APP_CONFIG.MEETING.MAX_DESCRIPTION_LENGTH, 'Description is too long')
    .optional(),
  timeSlots: z.array(z.object({
    id: z.string(),
    start: z.string().datetime(),
    end: z.string().datetime()
  }))
    .min(1, 'At least one time slot is required')
    .max(APP_CONFIG.MEETING.MAX_TIME_SLOTS, 'Too many time slots')
});

/**
 * Type for meeting creation input, derived from the schema
 */
export type CreateMeetingInput = z.infer<typeof meetingSchema>;

/**
 * Schema for validating meeting response input
 */
export const meetingResponseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  availability: z.record(z.string(), z.boolean())
});

/**
 * Type for meeting response input, derived from the schema
 */
export type MeetingResponseInput = z.infer<typeof meetingResponseSchema>;

/**
 * Re-export TimeSlot for convenience
 */
export type { TimeSlot }; 