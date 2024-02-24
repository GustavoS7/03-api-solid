import { InMemoryUsersRepository } from "@/repositories/in-memory-users-repository/in-memory-users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-erro";
import { UsersRepository } from "@/repositories/users-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";

let usersRepository: UsersRepository;
let sut: AuthenticateUseCase;
describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("should be able to authenticate", async () => {
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
    await expect(() =>
      sut.execute({
        email: "gustavods2003@outlook.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "any_name",
      email: "gustavods2003@outlook.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        email: "gustavods2003@outlook.com",
        password: "654321",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
