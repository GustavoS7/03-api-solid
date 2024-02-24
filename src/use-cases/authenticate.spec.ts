import { InMemoryUsersRepository } from "@/repositories/in-memory-users-repository/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { expect, describe, it } from "vitest";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-erro";

describe("Authenticate Use Case", () => {
  it("should be able to authenticate", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "any_name",
      email: "gustavods2003@outlook.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "gustavods2003@outlook.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await expect(() =>
      sut.execute({
        email: "gustavods2003@outlook.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong email", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await sut.execute({
      email: "gustavods2003@outlook.com",
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        email: "gustavods2003@outlook.com",
        password: "654321",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
