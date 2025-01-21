/**
 * Types for React component props
 */

import type { Meeting } from './meeting';

/**
 * Props for the EventDetails component
 */
export interface EventDetailsProps {
  /** The meeting details to display */
  readonly meeting: Meeting;
  /** The ID of the user viewing the event */
  readonly userId: string;
} 