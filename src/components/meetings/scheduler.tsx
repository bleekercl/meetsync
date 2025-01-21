'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TimeSlotPicker } from './time-slot-picker';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { meetingSchema } from '@/lib/validations/meeting';
import type { CreateMeetingInput } from '@/lib/types/meeting';

export function MeetingScheduler() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<CreateMeetingInput>({
    resolver: zodResolver(meetingSchema)
  });

  const onSubmit = async (data: CreateMeetingInput) => {
    setIsSubmitting(true);
    try {
      // Create meeting logic
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <Input
        {...form.register('title')}
        placeholder="Meeting Title"
        className="text-lg"
      />
      <TimeSlotPicker
        onChange={(slots) => form.setValue('timeSlots', slots)}
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Schedule Meeting'}
      </Button>
    </form>
  );
} 