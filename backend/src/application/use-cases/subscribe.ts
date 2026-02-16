import { ISubscriberRepository } from "../../domain/repositories/subscriber-repository.interface";
import {
  Subscriber,
  CreateSubscriberDTO,
} from "../../domain/entities/subscriber";

export class SubscribeUseCase {
  constructor(private readonly repo: ISubscriberRepository) {}

  async execute(
    dto: CreateSubscriberDTO,
  ): Promise<{ subscriber: Subscriber; alreadyExists: boolean }> {
    // Check if email already exists
    const existing = await this.repo.findByEmail(dto.email);
    if (existing) {
      return { subscriber: existing, alreadyExists: true };
    }

    const subscriber = await this.repo.create(dto);
    return { subscriber, alreadyExists: false };
  }
}
