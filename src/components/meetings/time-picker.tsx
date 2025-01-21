'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { generateTimeSlots } from '@/lib/utils/date';

interface TimePickerProps {
  onTimeSelect: (start: Date, end: Date) => void;
}

export function TimePicker({ onTimeSelect }: TimePickerProps) {
  const [date, setDate] = useState<Date>();
  const [startTime, setStartTime] = useState<string>();
  const [duration, setDuration] = useState<number>(60);

  const timeSlots = generateTimeSlots(30);
  const durations = [30, 60, 90, 120];

  const handleAdd = () => {
    if (!date || !startTime) return;

    const [hours, minutes] = startTime.split(':').map(Number);
    const start = new Date(date);
    start.setHours(hours, minutes, 0, 0);

    const end = new Date(start);
    end.setMinutes(end.getMinutes() + duration);

    onTimeSelect(start, end);
  };

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
      <div className="flex gap-4">
        <Select onValueChange={setStartTime}>
          <SelectTrigger>
            <SelectValue placeholder="Start Time" />
          </SelectTrigger>
          <SelectContent>
            {timeSlots.map((time: string) => (
              <SelectItem key={time} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          defaultValue="60"
          onValueChange={(value) => setDuration(Number(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Duration" />
          </SelectTrigger>
          <SelectContent>
            {durations.map((d) => (
              <SelectItem key={d} value={d.toString()}>
                {d} min
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        onClick={handleAdd}
        disabled={!date || !startTime}
        className="w-full"
      >
        Add Time Slot
      </Button>
    </div>
  );
} 