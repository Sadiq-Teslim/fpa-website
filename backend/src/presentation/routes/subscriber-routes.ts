import { Router } from "express";
import { SubscriberController } from "../controllers/subscriber-controller";

export function createSubscriberRoutes(
  controller: SubscriberController,
): Router {
  const router = Router();

  router.post("/", controller.handleSubscribe);
  router.get("/", controller.handleGetAll);
  router.get("/count", controller.handleGetCount);
  router.delete("/:id", controller.handleUnsubscribe);

  return router;
}
