import { NextFunction, Request, Response } from "express";

import { UserRepositoryImpl } from "../repositories/user.repository.impl";
import { CreateUser } from "../../application/usecases/users/create-user";
import { HttpStatusCode } from "../../shared/constants/http-status";
import { ApiResponse } from "../../shared/api-response";
import { AppError } from "../../shared/app-error";

const userRepository = new UserRepositoryImpl();
export class UserController {
  static async create(request: Request, response: Response): Promise<void> {
    try {
      const dto = request.body;
      const createUser = new CreateUser(userRepository);
      const user = await createUser.execute(dto);
      response.status(HttpStatusCode.CREATED).json(ApiResponse.success(user));
    } catch (err) {
      console.error("Error create:", err);
      if (err instanceof AppError) {
        response.status(err.statusCode).json(ApiResponse.error(err.message));
      }
      response
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json(ApiResponse.error("Error creating user"));
    }
  }
}
