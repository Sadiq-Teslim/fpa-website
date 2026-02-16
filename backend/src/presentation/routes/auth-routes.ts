import { Router } from "express";
import { AuthController } from "../controllers/auth-controller";

export function createAuthRoutes(controller: AuthController): Router {
  const router = Router();

  router.post("/verify", controller.handleVerifyPassword);

  return router;
}
