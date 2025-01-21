import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { EventDetails } from '@/components/meetings/event-details';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { FirebaseService } from '@/lib/services/firebase';
import type { Meeting } from '@/lib/types/meeting';
import { EventPageProps } from '@/lib/types/pages';
import { LAYOUT_CLASSES } from '@/lib/constants/config';

export default async function EventPage({ params }: EventPageProps) {
  const meeting = await FirebaseService.getInstance().getMeeting(params.eventId);
  
  if (!meeting) {
    notFound();
  }

  return (
    <div className={LAYOUT_CLASSES.CONTAINER}>
      <Suspense fallback={<LoadingSpinner />}>
        <EventDetails 
          meeting={meeting}
          userId={params.clerkUserId}
        />
      </Suspense>
    </div>
  );
} 