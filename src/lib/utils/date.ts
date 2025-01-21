import { format, parseISO } from 'date-fns';
import type { ISODateTimeString } from '../types/common';

/**
 * Formats a time slot into a human-readable string
 * @param start - Start time in ISO 8601 format
 * @param end - End time in ISO 8601 format
 * @returns Formatted string representation of the time slot
 */
export function formatTimeSlot(start: ISODateTimeString, end: ISODateTimeString): string {
  const startDate = parseISO(start);
  const endDate = parseISO(end);

  return `${format(startDate, 'MMM d, yyyy h:mm a')} - ${format(endDate, 'h:mm a')}`;
}

export function generateTimeSlots(intervalMinutes: number): string[] {
  const slots: string[] = [];
  const totalMinutesInDay = 24 * 60;
  
  for (let minutes = 0; minutes < totalMinutesInDay; minutes += intervalMinutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    slots.push(`${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`);
  }
  
  return slots;
} 