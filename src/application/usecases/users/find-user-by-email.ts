import { User } from "../../../domain/entities/user";
import { UserRepository } from "../../../domain/repositories/user.repository";

export class FindUserByEmail {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}