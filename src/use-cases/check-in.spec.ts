import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { InMemorGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { Decimal } from "@prisma/client/runtime/library";
import { CheckInUseCase } from "./check-in";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";
import { MaxDistaceError } from "./errors/max-distance-error";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemorGymsRepository;
let sut: CheckInUseCase;

describe("Check-in Profile Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemorGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: "any_id",
      title: "any_title",
      description: "any_description",
      phone: "any_phone",
      latitude: new Decimal(-27.0747279),
      longitude: new Decimal(-49.4889672),
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      userId: "any_id",
      gymId: "any_id",
      userLatitude: -27.0747279,
      userLongitude: -49.4889672,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      userId: "any_id",
      gymId: "any_id",
      userLatitude: -27.0747279,
      userLongitude: -49.4889672,
    });

    await expect(() =>
      sut.execute({
        userId: "any_id",
        gymId: "any_id",
        userLatitude: -27.0747279,
        userLongitude: -49.4889672,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("should be able to check in twice but in diferent days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      userId: "any_id",
      gymId: "any_id",
      userLatitude: -27.0747279,
      userLongitude: -49.4889672,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      userId: "any_id",
      gymId: "any_id",
      userLatitude: -27.0747279,
      userLongitude: -49.4889672,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distant gym", async () => {
    await gymsRepository.items.push({
      id: "gym_1",
      title: "any_title",
      description: "any_description",
      phone: "any_phone",
      latitude: new Decimal(-27.0747279),
      longitude: new Decimal(-49.4889672),
    });

    await expect(() =>
      sut.execute({
        userId: "any_id",
        gymId: "gym_1",
        userLatitude: -27.2092052,
        userLongitude: -49.4889672,
      }),
    ).rejects.toBeInstanceOf(MaxDistaceError);
  });
});
