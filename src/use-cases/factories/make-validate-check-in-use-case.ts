import { PrimsaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { ValidateCheckInUseCase } from "../validate-check-in";

export function makeValidateCheckInUseCase(): ValidateCheckInUseCase {
  const checkInsRepository = new PrimsaCheckInsRepository();
  const validateCheckInUseCase = new ValidateCheckInUseCase(checkInsRepository);

  return validateCheckInUseCase;
}
