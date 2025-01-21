export interface TimeSlot {
  id: string;
  start: string;
  end: string;
}

export interface MeetingResponse {
  name: string;
  availability: Record<string, boolean>;
  respondedAt: Date;
}

export interface Meeting {
  id: string;
  title: string;
  description?: string;
  hostId: string;
  timeSlots: TimeSlot[];
  responses: Record<string, MeetingResponse>;
  status: 'pending' | 'scheduled' | 'expired';
  createdAt: Date;
  expiresAt: Date;
}

export interface CreateMeetingInput {
  title: string;
  description?: string;
  timeSlots: TimeSlot[];
} 