import { verifyJWT } from "../../middlewares/verify-jwt";
import { authenticate } from "./authenticate.controller";
import { register } from "./register.controller";
import { refresh } from "./refresh.controller";
import { FastifyInstance } from "fastify";
import { profile } from "./profile";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  app.patch("/token/refresh", refresh);

  app.get("/me", { onRequest: [verifyJWT] }, profile);
}
