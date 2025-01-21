import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  query,
  where,
  Timestamp,
  type Firestore
} from 'firebase/firestore';
import type { Meeting } from '@/lib/types/meeting';
import { APP_CONFIG } from '@/lib/constants/config';

export class FirebaseService {
  private static instance: FirebaseService | null = null;
  private readonly db: Firestore;

  private constructor() {
    const app = initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
    });
    this.db = getFirestore(app);
  }

  public static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  /**
   * Retrieves a meeting by its ID
   * @param meetingId - The unique identifier of the meeting
   * @returns The meeting object if found, null otherwise
   * @throws {Error} When database operation fails
   * @example
   * const meeting = await FirebaseService.getInstance().getMeeting('123');
   */
  public async getMeeting(meetingId: string): Promise<Meeting | null> {
    try {
      const meetingRef = doc(this.db, 'meetings', meetingId);
      const meetingSnap = await getDoc(meetingRef);

      if (!meetingSnap.exists()) {
        return null;
      }

      return {
        id: meetingSnap.id,
        ...meetingSnap.data()
      } as Meeting;
    } catch (error) {
      throw new Error(`Failed to get meeting: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Creates a new meeting
   * @param meeting - The meeting data without an ID
   * @returns The ID of the created meeting
   * @throws {Error} When database operation fails
   * @example
   * const meetingId = await FirebaseService.getInstance().createMeeting({
   *   title: 'Team Sync',
   *   timeSlots: []
   * });
   */
  public async createMeeting(meeting: Omit<Meeting, 'id'>): Promise<string> {
    try {
      const meetingRef = doc(collection(this.db, 'meetings'));
      await setDoc(meetingRef, {
        ...meeting,
        createdAt: Timestamp.now(),
        expiresAt: Timestamp.fromDate(
          new Date(Date.now() + APP_CONFIG.MEETING.EXPIRATION_DAYS * 24 * 60 * 60 * 1000)
        )
      });
      return meetingRef.id;
    } catch (error) {
      throw new Error(`Failed to create meeting: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Updates an attendee's response for a meeting
   * @param meetingId - The ID of the meeting to update
   * @param attendeeEmail - The email of the attendee
   * @param availability - Map of time slot IDs to availability status
   * @throws {Error} When database operation fails
   * @example
   * await FirebaseService.getInstance().updateMeetingResponse(
   *   '123',
   *   'user@example.com',
   *   { 'slot1': true, 'slot2': false }
   * );
   */
  public async updateMeetingResponse(
    meetingId: string,
    attendeeEmail: string,
    availability: Readonly<Record<string, boolean>>
  ): Promise<void> {
    try {
      const meetingRef = doc(this.db, 'meetings', meetingId);
      await updateDoc(meetingRef, {
        [`responses.${attendeeEmail}`]: {
          availability,
          respondedAt: Timestamp.now()
        }
      });
    } catch (error) {
      throw new Error(`Failed to update meeting response: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
} 