import { ISubscriberRepository } from "../../domain/repositories/subscriber-repository.interface";
import { Subscriber } from "../../domain/entities/subscriber";

export class GetAllSubscribersUseCase {
  constructor(private readonly repo: ISubscriberRepository) {}

  async execute(): Promise<Subscriber[]> {
    return this.repo.findAll();
  }
}
