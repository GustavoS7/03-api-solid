import { makeGetUserProfileUseCase } from "@/use-cases/factories/make-get-user-profile";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  const getUserProfile = makeGetUserProfileUseCase();

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  });
}
