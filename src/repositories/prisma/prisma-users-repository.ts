import { UsersRepository } from "../users-repository";
import { Prisma, User } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export class PrismaUserRepository implements UsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data });

    return user;
  }
}
