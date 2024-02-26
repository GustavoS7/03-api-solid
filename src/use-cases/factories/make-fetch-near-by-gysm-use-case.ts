import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { FetchNearByGymsUseCase } from "../fetch-near-by-gyms";

export function makeFetchNearByGymsUseCase(): FetchNearByGymsUseCase {
  const gymsRepository = new PrismaGymsRepository();
  const fetchNearByGymsUseCase = new FetchNearByGymsUseCase(gymsRepository);

  return fetchNearByGymsUseCase;
}
