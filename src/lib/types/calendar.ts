import type { TimeSlot } from './common';

/**
 * Represents a busy time period from Google Calendar
 */
export interface BusyPeriod {
  readonly start: string;  // ISO string
  readonly end: string;    // ISO string
}

/**
 * Represents availability status for a time slot
 */
export interface CalendarAvailability {
  readonly timeSlotId: string;
  readonly isAvailable: boolean;
}

/**
 * Represents a calendar event
 */
export interface CalendarEvent {
  readonly title: string;
  readonly start: string;
  readonly end: string;
  readonly attendees: ReadonlyArray<string>;
}

/**
 * Input type for creating a calendar event
 */
export interface CreateCalendarEventInput {
  readonly title: string;
  readonly start: string;  // ISO string
  readonly end: string;    // ISO string
  readonly attendees: ReadonlyArray<string>;
}

/**
 * Re-export TimeSlot for convenience
 */
export type { TimeSlot }; 