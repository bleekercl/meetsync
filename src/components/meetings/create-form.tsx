'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TimePicker } from './time-picker';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { meetingSchema } from '@/lib/validations/meeting';
import type { CreateMeetingInput } from '@/lib/types/meeting';

export function CreateForm() {
  const [timeSlots, setTimeSlots] = useState<Array<{ start: Date; end: Date }>>([]);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<CreateMeetingInput>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      title: '',
      description: '',
      timeSlots: []
    }
  });

  const onSubmit = async (data: CreateMeetingInput) => {
    try {
      const response = await fetch('/api/meetings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          timeSlots: timeSlots.map((slot, index) => ({
            id: index.toString(),
            start: slot.start.toISOString(),
            end: slot.end.toISOString()
          }))
        })
      });

      if (!response.ok) throw new Error('Failed to create meeting');

      const { meetingId } = await response.json();
      router.push(`/meetings/${meetingId}`);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create meeting. Please try again.',
        variant: 'destructive'
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meeting Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Team Sync" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Weekly team sync meeting" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-4">
          <FormLabel>Time Slots</FormLabel>
          <TimePicker
            onTimeSelect={(start, end) =>
              setTimeSlots((prev) => [...prev, { start, end }])
            }
          />
          <div className="space-y-2">
            {timeSlots.map((slot, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg border"
              >
                <span className="text-sm">
                  {slot.start.toLocaleString()} - {slot.end.toLocaleString()}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setTimeSlots((prev) =>
                      prev.filter((_, i) => i !== index)
                    )
                  }
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
        <Button
          type="submit"
          disabled={timeSlots.length === 0 || form.formState.isSubmitting}
        >
          Create Meeting
        </Button>
      </form>
    </Form>
  );
} 