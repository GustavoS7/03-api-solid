import request from "supertest";
import { FastifyInstance } from "fastify";

export async function createAndAuthenticateUser(
  app: FastifyInstance,
): Promise<{ token: string }> {
  await request(app.server).post("/users").send({
    name: "Gustavo",
    email: "gustavo@email.com",
    password: "123456",
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email: "gustavo@email.com",
    password: "123456",
  });

  const { token } = authResponse.body;

  return { token };
}
