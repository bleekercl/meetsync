'use client';

import { Button } from '@/components/ui/button';
import { formatTimeSlot } from '@/lib/utils/date';
import type { TimeSlot } from '@/lib/types/common';

interface SelectedSlotsProps {
  slots: TimeSlot[];
  onRemove: (slot: TimeSlot) => void;
}

export function SelectedSlots({ slots, onRemove }: SelectedSlotsProps) {
  if (slots.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      {slots.map((slot) => (
        <div
          key={slot.id}
          className="flex items-center justify-between p-2 rounded-lg border"
        >
          <span className="text-sm">{formatTimeSlot(slot.start, slot.end)}</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onRemove(slot)}
          >
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
} 