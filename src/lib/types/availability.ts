export interface EventAvailability {
  readonly name: string;
  readonly email: string;
  readonly timeSlots: ReadonlyArray<{
    readonly slotId: string;
    readonly isAvailable: boolean;
  }>;
}

export interface AttendeeResponse {
  readonly name: string;
  readonly email: string;
  readonly availability: ReadonlyMap<string, boolean>;
  readonly respondedAt: string;
} 