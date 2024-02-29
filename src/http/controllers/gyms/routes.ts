import { verifyUserRole } from "@/http/middlewares/verify-user-role";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { nearBy } from "./near-by.controller";
import { search } from "./search.controller";
import { create } from "./create.controller";
import { FastifyInstance } from "fastify";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/gyms/search", search);
  app.get("/gyms/near-by", nearBy);

  app.post("/gyms", { onRequest: [verifyUserRole("ADMIN")] }, create);
}
