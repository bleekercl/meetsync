export interface User {
  readonly id: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly imageUrl: string;
}

export interface UserSettings {
  readonly userId: string;
  readonly timezone: string;
  readonly defaultDuration: number;
  readonly workingHours: {
    readonly start: string;  // HH:mm format
    readonly end: string;    // HH:mm format
  };
  readonly workingDays: ReadonlyArray<number>;  // 0-6, where 0 is Sunday
} 