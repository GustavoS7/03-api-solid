import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { InMemorGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { Decimal } from "@prisma/client/runtime/library";
import { CheckInUseCase } from "./check-in";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemorGymsRepository;
let sut: CheckInUseCase;

describe("Check-in Profile Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemorGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    await gymsRepository.items.push({
      id: "any_id",
      title: "any_title",
      description: "any_description",
      phone: "any_phone",
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    });

    const { checkIn } = await sut.execute({
      userId: "any_id",
      gymId: "any_id",
      userLatitude: 1,
      userLongitude: 1,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    await gymsRepository.items.push({
      id: "any_id",
      title: "any_title",
      description: "any_description",
      phone: "any_phone",
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    });

    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      userId: "any_id",
      gymId: "any_id",
      userLatitude: 1,
      userLongitude: 1,
    });

    await expect(() =>
      sut.execute({
        userId: "any_id",
        gymId: "any_id",
        userLatitude: 1,
        userLongitude: 1,
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check in twice but in diferent days", async () => {
    await gymsRepository.items.push({
      id: "any_id",
      title: "any_title",
      description: "any_description",
      phone: "any_phone",
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    });

    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      userId: "any_id",
      gymId: "any_id",
      userLatitude: 1,
      userLongitude: 1,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      userId: "any_id",
      gymId: "any_id",
      userLatitude: 1,
      userLongitude: 1,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
