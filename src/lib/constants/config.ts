/**
 * Application-wide configuration constants
 * @remarks
 * All configuration values should be defined here to avoid magic numbers in the code
 */
export const APP_CONFIG = {
  APP_NAME: 'MeetSync',
  MEETING: {
    EXPIRATION_DAYS: 30,
    MAX_TIME_SLOTS: 5,
    MIN_TITLE_LENGTH: 3,
    MAX_TITLE_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 500,
    DEFAULT_DURATION: 60, // minutes
    MIN_DURATION: 15,
    MAX_DURATION: 240,
    TIME_SLOT_INTERVAL: 30, // minutes
    EXPIRY_DAYS: 30
  },
  CALENDAR: {
    SCOPES: [
      'https://www.googleapis.com/auth/calendar.readonly'
    ],
    WORKING_HOURS: {
      DEFAULT_START: '09:00',
      DEFAULT_END: '17:00'
    },
    WORKING_DAYS: [1, 2, 3, 4, 5], // Mon-Fri
    TIME_ZONES: [
      'America/New_York',
      'America/Chicago',
      'America/Denver',
      'America/Los_Angeles',
      'Europe/London',
      'Europe/Paris',
      'Asia/Tokyo',
      'Australia/Sydney'
    ] as const
  },
  API: {
    RATE_LIMIT: {
      MAX_REQUESTS: 100,
      WINDOW_MS: 60 * 1000 // 1 minute
    }
  }
} as const;

/**
 * Error messages used throughout the application
 */
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'You must be signed in to perform this action',
  INVALID_MEETING: 'Invalid meeting data provided',
  CALENDAR_SYNC_FAILED: 'Failed to sync with calendar',
  DATABASE_ERROR: 'Database operation failed',
  INVALID_INPUT: 'Invalid input provided'
} as const;

export const APP_METADATA = {
  TITLE: 'MeetSync',
  DESCRIPTION: 'Effortless meeting scheduling across time zones'
} as const;

export const CLERK_APPEARANCE = {
  elements: {
    formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
    footerActionLink: "text-blue-600 hover:text-blue-700"
  }
} as const;

export const LAYOUT_CLASSES = {
  CONTAINER: "container max-w-4xl py-8",
  PAGE_TITLE: "text-3xl font-bold mb-8"
} as const; 