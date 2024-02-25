import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface SearchGymsCaseUseRequest {
  query: string;
  page: number;
}

interface SearchGymsCaseUseResponse {
  gyms: Gym[];
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsCaseUseRequest): Promise<SearchGymsCaseUseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page);

    return {
      gyms,
    };
  }
}
