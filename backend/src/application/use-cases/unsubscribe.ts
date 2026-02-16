import { ISubscriberRepository } from "../../domain/repositories/subscriber-repository.interface";

export class UnsubscribeUseCase {
  constructor(private readonly repo: ISubscriberRepository) {}

  async execute(id: string): Promise<boolean> {
    return this.repo.delete(id);
  }
}
