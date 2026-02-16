/**
 * Domain Entity: Subscriber
 * Pure domain model — no framework dependencies
 */
export interface Subscriber {
  id: string;
  email: string;
  source: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSubscriberDTO {
  email: string;
  source?: string;
}
