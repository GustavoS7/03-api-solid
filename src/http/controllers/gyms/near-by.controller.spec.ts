import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";

describe("Near By (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to search near by gyms", async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "gym_01",
        description: "any_description",
        phone: "any_phone",
        latitude: -27.2747279,
        longitude: -49.6889672,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "gym_02",
        description: "any_description",
        phone: "any_phone",
        latitude: -27.0610928,
        longitude: -49.5229501,
      });

    const response = await request(app.server)
      .get("/gyms/near-by")
      .query({
        latitude: -27.2747279,
        longitude: -49.6889672,
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);

    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "gym_01",
      }),
    ]);
  });
});
