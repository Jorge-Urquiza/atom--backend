import { Request, Response } from "express";
import { GenerateToken } from "../../application/usecases/auth/generate-token";
import { FindUserByEmail } from "../../application/usecases/users/find-user-by-email";
import { UserRepositoryImpl } from "../repositories/user.repository.impl";
import { HttpStatusCode } from "../../shared/constants/http-status";
import { ApiResponse } from "../../shared/api-response";
import { AppError } from "../../shared/app-error";
import { AuthDto } from "../../application/dtos/auth/auth.dto";

const userRepository = new UserRepositoryImpl();

export class AuthController {
  static async login(req: Request, response: Response): Promise<void> {
    const loginDto: AuthDto = req.body;
    const { email } = loginDto;
    const findUser = new FindUserByEmail(userRepository);
    const user = await findUser.execute(email);

    const token = new GenerateToken().execute(user);

    response
      .status(HttpStatusCode.OK)
      .json(ApiResponse.success({ token, user }));
  }
}
