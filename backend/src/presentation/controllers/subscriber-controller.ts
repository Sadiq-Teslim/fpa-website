import { Request, Response } from "express";
import { SubscribeUseCase } from "../../application/use-cases/subscribe";
import { GetAllSubscribersUseCase } from "../../application/use-cases/get-all-subscribers";
import { GetSubscriberCountUseCase } from "../../application/use-cases/get-subscriber-count";
import { UnsubscribeUseCase } from "../../application/use-cases/unsubscribe";
import { subscribeSchema } from "../validation/subscriber-schemas";

export class SubscriberController {
  constructor(
    private readonly subscribeUseCase: SubscribeUseCase,
    private readonly getAllSubscribersUseCase: GetAllSubscribersUseCase,
    private readonly getSubscriberCountUseCase: GetSubscriberCountUseCase,
    private readonly unsubscribeUseCase: UnsubscribeUseCase,
  ) {}

  handleSubscribe = async (req: Request, res: Response) => {
    const data = subscribeSchema.parse(req.body);
    const { subscriber, alreadyExists } =
      await this.subscribeUseCase.execute(data);

    if (alreadyExists) {
      res.status(200).json({
        message: "You're already subscribed!",
        subscriber,
      });
      return;
    }

    res.status(201).json({
      message: "Successfully subscribed!",
      subscriber,
    });
  };

  handleGetAll = async (_req: Request, res: Response) => {
    const subscribers = await this.getAllSubscribersUseCase.execute();
    res.json(subscribers);
  };

  handleGetCount = async (_req: Request, res: Response) => {
    const count = await this.getSubscriberCountUseCase.execute();
    res.json({ count });
  };

  handleUnsubscribe = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    await this.unsubscribeUseCase.execute(id);
    res.status(204).send();
  };
}
