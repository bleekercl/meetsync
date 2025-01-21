import { Credentials, OAuth2Client } from 'google-auth-library';
import { calendar_v3, google } from 'googleapis';
import type {
  BusyPeriod,
  CalendarAvailability,
  CreateCalendarEventInput,
  TimeSlot
} from '../types/calendar';

export class GoogleCalendarService {
  private readonly oauth2Client: OAuth2Client;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`
    );
  }

  /**
   * Converts Google Calendar busy periods to internal BusyPeriod type
   * @throws {Error} If the period data is invalid
   */
  private convertBusyPeriods(periods: calendar_v3.Schema$TimePeriod[]): ReadonlyArray<BusyPeriod> {
    return periods.map(period => {
      if (!period.start || !period.end) {
        throw new Error('Invalid busy period data from Google Calendar API');
      }
      return {
        start: period.start,
        end: period.end
      };
    });
  }

  /**
   * Checks availability for given time slots against the user's Google Calendar
   * @param timeSlots - Array of time slots to check for availability
   * @param accessToken - Google OAuth2 access token for the user
   * @returns Array of availability status for each time slot
   * @throws {Error} When calendar API call fails or returns invalid data
   * @example
   * const availability = await checkAvailability([
   *   { id: '1', start: '2024-01-21T10:00:00Z', end: '2024-01-21T11:00:00Z' }
   * ], 'access_token');
   */
  public async checkAvailability(
    timeSlots: ReadonlyArray<TimeSlot>,
    accessToken: string
  ): Promise<ReadonlyArray<CalendarAvailability>> {
    this.oauth2Client.setCredentials({ access_token: accessToken });
    
    try {
      const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
      const { data } = await calendar.freebusy.query({
        requestBody: {
          timeMin: timeSlots[0].start,
          timeMax: timeSlots[timeSlots.length - 1].end,
          items: [{ id: 'primary' }]
        }
      });

      if (!data.calendars?.primary?.busy) {
        throw new Error('Invalid calendar data received from Google Calendar API');
      }

      const busyPeriods = this.convertBusyPeriods(data.calendars.primary.busy);

      return timeSlots.map(slot => ({
        timeSlotId: slot.id,
        isAvailable: !this.isOverlapping(slot, busyPeriods)
      }));
    } catch (error) {
      throw new Error(`Failed to check calendar availability: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      this.oauth2Client.setCredentials({} as Credentials);
    }
  }

  private isOverlapping(
    slot: TimeSlot, 
    busyPeriods: ReadonlyArray<BusyPeriod>
  ): boolean {
    return busyPeriods.some(period => 
      (new Date(slot.start) < new Date(period.end) &&
       new Date(slot.end) > new Date(period.start))
    );
  }

  /**
   * Creates a new event in the user's Google Calendar
   * @param event - Event details for creation
   * @throws {Error} When event creation fails
   * @example
   * await createEvent({
   *   title: 'Team Meeting',
   *   start: '2024-01-21T10:00:00Z',
   *   end: '2024-01-21T11:00:00Z',
   *   attendees: ['user@example.com']
   * });
   */
  public async createEvent(event: CreateCalendarEventInput): Promise<void> {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
    await calendar.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary: event.title,
        start: { dateTime: event.start },
        end: { dateTime: event.end },
        attendees: event.attendees.map(email => ({ email }))
      }
    });
  }
} 