import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { CheckInUseCase } from "./check-in";

let checkInsRepository: CheckInsRepository;
let sut: CheckInUseCase;

describe("Check-in Profile Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      userId: "any_id",
      gymId: "any_id",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      userId: "any_id",
      gymId: "any_id",
    });

    await expect(() =>
      sut.execute({
        userId: "any_id",
        gymId: "any_id",
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check in twice but in diferent days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      userId: "any_id",
      gymId: "any_id",
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      userId: "any_id",
      gymId: "any_id",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
