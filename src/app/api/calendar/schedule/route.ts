import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { GoogleCalendarService } from '@/lib/services/google-calendar';
import { FirebaseService } from '@/lib/services/firebase';
import type { Meeting } from '@/lib/types/meeting';

export async function POST(req: Request) {
  try {
    const authResult = await auth();
    const userId = authResult.userId;
    const getToken = authResult.getToken;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const accessToken = await getToken({ template: 'google_calendar' });
    if (!accessToken) {
      return new NextResponse('Calendar not connected', { status: 400 });
    }

    const body = await req.json();
    const { meetingId, selectedSlot } = body as {
      meetingId: string;
      selectedSlot: string;
    };

    const firebase = FirebaseService.getInstance();
    const meeting = await firebase.getMeeting(meetingId);

    if (!meeting || meeting.hostId !== userId) {
      return new NextResponse('Meeting not found', { status: 404 });
    }

    const calendar = new GoogleCalendarService();
    await calendar.createEvent({
      title: meeting.title,
      start: selectedSlot,
      end: new Date(new Date(selectedSlot).getTime() + 60 * 60 * 1000).toISOString(),
      attendees: Object.keys(meeting.responses)
    });

    await firebase.createMeeting({
      ...meeting,
      status: 'scheduled',
      scheduledSlotId: selectedSlot
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to schedule meeting:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 