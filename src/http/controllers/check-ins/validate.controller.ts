import { makeValidateCheckInUseCase } from "@/use-cases/factories";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function validate(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validateCheckInParamsSchema.parse(request.params);

  const validateCheckInUseCase = makeValidateCheckInUseCase();

  await validateCheckInUseCase.execute({
    checkInId,
  });

  return reply.status(204);
}
