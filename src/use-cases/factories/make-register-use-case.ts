import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "../register";

export function makeRegisterUseCase(): RegisterUseCase {
  const usersRepository = new PrismaUserRepository();
  const registerUseCase = new RegisterUseCase(usersRepository);

  return registerUseCase;
}
