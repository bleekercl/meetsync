/**
 * Common types used across the application
 */

export interface Metadata {
  readonly title: string;
  readonly description: string;
}

/** Represents an ISO 8601 formatted date-time string */
export type ISODateTimeString = string;

/**
 * Represents a time slot for a meeting
 * @remarks
 * All date-time values are stored as ISO 8601 strings
 */
export interface TimeSlot {
  /** Unique identifier for the time slot */
  readonly id: string;
  /** Start time in ISO 8601 format */
  readonly start: ISODateTimeString;
  /** End time in ISO 8601 format */
  readonly end: ISODateTimeString;
}

export interface LayoutProps {
  readonly children: React.ReactNode;
} 