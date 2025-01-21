'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { formatTimeSlot } from '@/lib/utils/date';
import type { TimeSlot } from '@/lib/types/common';

interface AvailabilityGridProps {
  timeSlots: TimeSlot[];
  onSubmit: (availability: Record<string, boolean>) => void;
}

export function AvailabilityGrid({ timeSlots, onSubmit }: AvailabilityGridProps) {
  const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set());

  const handleSlotToggle = (slotId: string) => {
    const newSelected = new Set(selectedSlots);
    if (newSelected.has(slotId)) {
      newSelected.delete(slotId);
    } else {
      newSelected.add(slotId);
    }
    setSelectedSlots(newSelected);
  };

  const handleSubmit = () => {
    const availability = Object.fromEntries(
      timeSlots.map(slot => [slot.id, selectedSlots.has(slot.id)])
    );
    onSubmit(availability);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {timeSlots.map((slot) => (
          <button
            key={slot.id}
            type="button"
            onClick={() => handleSlotToggle(slot.id)}
            className={`p-4 rounded-lg border transition-colors ${
              selectedSlots.has(slot.id)
                ? 'bg-blue-50 border-blue-200'
                : 'hover:bg-gray-50'
            }`}
          >
            {formatTimeSlot(slot.start, slot.end)}
          </button>
        ))}
      </div>
      <Button onClick={handleSubmit} className="w-full">
        Submit Availability
      </Button>
    </div>
  );
} 