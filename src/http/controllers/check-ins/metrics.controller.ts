import { makeGetUserMetricsUseCase } from "@/use-cases/factories";
import { FastifyReply, FastifyRequest } from "fastify";

export async function metrics(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  const getUserMetricsHistoryUseCase = makeGetUserMetricsUseCase();

  const { checkInsCount } = await getUserMetricsHistoryUseCase.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send({ checkInsCount });
}
