import { InMemorGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { SearchGymsUseCase } from "./seach-gyms";

let gymsRepository: InMemorGymsRepository;
let sut: SearchGymsUseCase;

describe("Search Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemorGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it("should be able to search gyms", async () => {
    await gymsRepository.create({
      title: "gym_1",
      description: "any_description",
      phone: "any_phone",
      latitude: -27.0747279,
      longitude: -49.4889672,
    });

    await gymsRepository.create({
      title: "gym_2",
      description: "any_description",
      phone: "any_phone",
      latitude: -27.0747279,
      longitude: -49.4889672,
    });

    const { gyms } = await sut.execute({
      query: "gym_1",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "gym_1" })]);
  });

  it("should be able to fecth paginated gym search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `gym_${i}`,
        description: "any_description",
        phone: "any_phone",
        latitude: -27.0747279,
        longitude: -49.4889672,
      });
    }

    const { gyms } = await sut.execute({
      query: "gym",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "gym_21" }),
      expect.objectContaining({ title: "gym_22" }),
    ]);
  });
});
