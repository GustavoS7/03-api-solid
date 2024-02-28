import { makeUserCheckInsHistoryUseCase } from "@/use-cases/factories";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function history(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  const checkInHistoryParamsSchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInHistoryParamsSchema.parse(request.query);

  const checkInHistoryUseCase = makeUserCheckInsHistoryUseCase();

  const { checkIns } = await checkInHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  });

  return reply.status(200).send({ checkIns });
}
