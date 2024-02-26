import { PrimsaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { FetchUserCheckInsHitoryUseCase } from "../fetch-user-check-ins-history";

export function makeUserCheckInsHistoryUseCase(): FetchUserCheckInsHitoryUseCase {
  const checkInsRepository = new PrimsaCheckInsRepository();
  const fetchUserCheckInsHistoryUseCase = new FetchUserCheckInsHitoryUseCase(
    checkInsRepository,
  );

  return fetchUserCheckInsHistoryUseCase;
}
