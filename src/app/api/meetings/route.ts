import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { FirebaseService } from '@/lib/services/firebase';
import { Timestamp } from 'firebase/firestore';
import { meetingSchema } from '@/lib/validations/meeting';
import type { CreateMeetingInput } from '@/lib/types/meeting';
import type { MeetingStatus } from '@/lib/types/meeting';

export async function POST(req: Request) {
  try {
    const authResult = await auth();
    const userId = authResult.userId;
    
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const validatedData = meetingSchema.parse(body) as CreateMeetingInput;
    
    const firebase = FirebaseService.getInstance();
    const meetingId = await firebase.createMeeting({
      ...validatedData,
      hostId: userId,
      status: 'pending' as MeetingStatus,
      responses: {},
      createdAt: Timestamp.now(),
      expiresAt: Timestamp.fromDate(
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      )
    });

    return NextResponse.json({ meetingId });
  } catch (error) {
    console.error('Failed to create meeting:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 