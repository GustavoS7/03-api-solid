import { verifyJWT } from "../../middlewares/verify-jwt";
import { validate } from "./validate.controller";
import { metrics } from "./metrics.controller";
import { history } from "./history.controller";
import { create } from "./create.controller";
import { FastifyInstance } from "fastify";

export async function checkInsoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/check-ins/history", history);
  app.get("/check-ins/metrics", metrics);

  app.post("/check-ins/:checkInId/validate", validate);
  app.post("/gyms/:gymId/check-ins", create);
}
