import { User } from "../../../domain/entities/user";
import { UserRepository } from "../../../domain/repositories/user.repository";
import { AppError } from "../../../shared/app-error";
import { HttpStatusCode } from "../../../shared/constants/http-status";
import { parseFirestoreTimestamps } from "../../../shared/firestore-utils";

export class FindUserByEmail {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    
    if (!user) {
      throw new AppError("User not found", HttpStatusCode.NOT_FOUND);
    }
    const safeUser = parseFirestoreTimestamps(user);
    return safeUser;
  }
}