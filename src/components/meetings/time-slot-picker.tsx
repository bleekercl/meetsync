'use client';

import { useState } from 'react';
import { TimePicker } from './time-picker';
import { Button } from '@/components/ui/button';
import type { TimeSlot } from '@/lib/types/common';

interface TimeSlotPickerProps {
  onChange: (slots: TimeSlot[]) => void;
}

export function TimeSlotPicker({ onChange }: TimeSlotPickerProps) {
  const [selectedSlots, setSelectedSlots] = useState<TimeSlot[]>([]);

  const handleAddSlot = (start: Date, end: Date) => {
    const newSlot: TimeSlot = {
      id: crypto.randomUUID(),
      start: start.toISOString(),
      end: end.toISOString()
    };

    const updatedSlots = [...selectedSlots, newSlot];
    setSelectedSlots(updatedSlots);
    onChange(updatedSlots);
  };

  const handleRemoveSlot = (slotId: string) => {
    const updatedSlots = selectedSlots.filter((slot) => slot.id !== slotId);
    setSelectedSlots(updatedSlots);
    onChange(updatedSlots);
  };

  return (
    <div className="space-y-6">
      <TimePicker onTimeSelect={handleAddSlot} />
      <div className="space-y-2">
        {selectedSlots.map((slot) => (
          <div
            key={slot.id}
            className="flex items-center justify-between p-3 border rounded-lg"
          >
            <span className="text-sm">
              {new Date(slot.start).toLocaleString()} - {new Date(slot.end).toLocaleString()}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveSlot(slot.id)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
} 