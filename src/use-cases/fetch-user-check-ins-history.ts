import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface FetchUserCheckInsHitoryUseCaseRequest {
  userId: string;
  page: number;
}

interface FetchUserCheckInsHitoryUseCaseResponse {
  checkIns: CheckIn[];
}

export class FetchUserCheckInsHitoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHitoryUseCaseRequest): Promise<FetchUserCheckInsHitoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    );

    return { checkIns };
  }
}
