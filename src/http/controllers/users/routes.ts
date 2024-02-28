import { verifyJWT } from "../../middlewares/verify-jwt";
import { authenticate } from "./authenticate.controller";
import { register } from "./register.controller";
import { FastifyInstance } from "fastify";
import { profile } from "./profile";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  app.get("/me", { onRequest: [verifyJWT] }, profile);
}
