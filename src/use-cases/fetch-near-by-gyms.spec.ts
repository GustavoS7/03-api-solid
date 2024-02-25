import { InMemorGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearByGymsUseCase } from "./fetch-near-by-gyms";
import { expect, describe, it, beforeEach } from "vitest";

let gymsRepository: InMemorGymsRepository;
let sut: FetchNearByGymsUseCase;

describe("Fetch Near Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemorGymsRepository();
    sut = new FetchNearByGymsUseCase(gymsRepository);
  });

  it("should be able to fetch near by gyms", async () => {
    await gymsRepository.create({
      title: "gym_1",
      description: "any_description",
      phone: "any_phone",
      latitude: -27.2747279,
      longitude: -49.6889672,
    });

    await gymsRepository.create({
      title: "gym_2",
      description: "any_description",
      phone: "any_phone",
      latitude: -27.0610928,
      longitude: -49.5229501,
    });

    const { gyms } = await sut.execute({
      userLatitude: -27.2747279,
      userLongitude: -49.6889672,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "gym_1" })]);
  });
});
