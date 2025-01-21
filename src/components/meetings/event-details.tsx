'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { formatTimeSlot } from '@/lib/utils/date';
import type { EventDetailsProps } from '@/lib/types/components';

export function EventDetails({ meeting, userId }: EventDetailsProps) {
  const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const handleSlotToggle = (slotId: string) => {
    const newSelected = new Set(selectedSlots);
    if (newSelected.has(slotId)) {
      newSelected.delete(slotId);
    } else {
      newSelected.add(slotId);
    }
    setSelectedSlots(newSelected);
  };

  const handleSubmit = async () => {
    try {
      // Submit availability logic
      toast({
        title: "Availability submitted",
        description: "Your response has been recorded"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit availability",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="p-6">
      <h1 className="text-2xl font-bold mb-4">{meeting.title}</h1>
      <div className="space-y-4">
        {meeting.timeSlots.map((slot) => (
          <button
            key={slot.id}
            onClick={() => handleSlotToggle(slot.id)}
            className={`w-full p-4 rounded-lg border transition-colors ${
              selectedSlots.has(slot.id)
                ? 'bg-blue-50 border-blue-200'
                : 'hover:bg-gray-50'
            }`}
          >
            {formatTimeSlot(slot.start, slot.end)}
          </button>
        ))}
      </div>
      <Button
        onClick={handleSubmit}
        className="w-full mt-6"
      >
        Submit Availability
      </Button>
    </Card>
  );
} 