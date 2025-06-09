import { User } from "../../../domain/entities/user";
import { UserRepository } from "../../../domain/repositories/user.repository";
import { AppError } from "../../../shared/app-error";
import { HttpStatusCode } from "../../../shared/constants/http-status";
import { CreateUserDto } from "../../dtos/task/create-user.dto";

export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;

    const user = await this.userRepository.findByEmail(email);
    if (user) {
      throw new AppError("Email is already in use", HttpStatusCode.CONFLICT);
    }

    const newUser: User = {
      email,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    };

    const userId = await this.userRepository.save(newUser);
    newUser.id = userId;
    return { ...newUser, id: userId };
  }
}
