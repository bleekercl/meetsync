import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { GoogleCalendarService } from '@/lib/services/google-calendar';
import type { TimeSlot } from '@/lib/types/common';

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
    const { timeSlots } = body as { timeSlots: TimeSlot[] };

    const calendar = new GoogleCalendarService();
    const availability = await calendar.checkAvailability(timeSlots, accessToken);

    return NextResponse.json(availability);
  } catch (error) {
    console.error('Failed to check calendar availability:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 