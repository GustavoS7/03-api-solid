import { authenticate } from "./controllers/authenticate.controller";
import { register } from "./controllers/register.controller";
import { verifyJWT } from "./middlewares/verify-jwt";
import { profile } from "./controllers/profile";
import { FastifyInstance } from "fastify";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  app.get("/me", { onRequest: [verifyJWT] }, profile);
}
