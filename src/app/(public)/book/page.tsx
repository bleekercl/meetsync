import { Suspense } from 'react';
import { MeetingScheduler } from '@/components/meetings/scheduler';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { LAYOUT_CLASSES } from '@/lib/constants/config';

export default function BookPage() {
  return (
    <div className={LAYOUT_CLASSES.CONTAINER}>
      <h1 className={LAYOUT_CLASSES.PAGE_TITLE}>Schedule a Meeting</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <MeetingScheduler />
      </Suspense>
    </div>
  );
} 