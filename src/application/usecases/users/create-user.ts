import { User } from "../../../domain/entities/user";
import { UserRepository } from "../../../domain/repositories/user.repository";
import { CreateUserDto } from "../../dtos/task/create-user.dto";

export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto
    const createdAt = new Date();
    await this.userRepository.save({ email, createdAt });
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error("User creation failed");
    return user;
  }
}