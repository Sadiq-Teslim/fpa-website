import { ISubscriberRepository } from "../../domain/repositories/subscriber-repository.interface";

export class GetSubscriberCountUseCase {
  constructor(private readonly repo: ISubscriberRepository) {}

  async execute(): Promise<number> {
    return this.repo.count();
  }
}
