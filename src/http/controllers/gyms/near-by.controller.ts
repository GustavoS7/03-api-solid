import { makeFetchNearByGymsUseCase } from "@/use-cases/factories";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function nearBy(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  const nearByGymsQuerySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = nearByGymsQuerySchema.parse(request.body);

  const nearByGymsUseCase = makeFetchNearByGymsUseCase();

  const { gyms } = await nearByGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(200).send({ gyms });
}
