/**
 * Types for Next.js pages and routes
 */

/**
 * Parameters for dynamic routes
 */
export interface DynamicRouteParams {
  /** Clerk user identifier from the URL */
  readonly clerkUserId: string;
  /** Meeting event identifier from the URL */
  readonly eventId: string;
}

/**
 * Props for the event page component
 */
export interface EventPageProps {
  /** URL parameters for the event page */
  readonly params: DynamicRouteParams;
} 