import { Subscriber, CreateSubscriberDTO } from "../entities/subscriber";

export interface ISubscriberRepository {
  findAll(): Promise<Subscriber[]>;
  findByEmail(email: string): Promise<Subscriber | null>;
  create(dto: CreateSubscriberDTO): Promise<Subscriber>;
  delete(id: string): Promise<boolean>;
  count(): Promise<number>;
}
