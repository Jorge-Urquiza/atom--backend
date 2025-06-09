import { Request, Response } from "express";

import { TaskRepositoryImpl } from "../repositories/task.repository.impl";

import { GetUserTasks } from "../../application/usecases/tasks/get-user-tasks";
import { CreateTask } from "../../application/usecases/tasks/create-task";
import { UpdateTask } from "../../application/usecases/tasks/update-task";
import { DeleteTask } from "../../application/usecases/tasks/delete-task";
import { AuthenticatedRequest } from "../middleware/authenticated-request";
import { HttpStatusCode } from "../../shared/constants/http-status";
import { ApiResponse } from "../../shared/api-response";
import { AppError } from "../../shared/app-error";

const taskRepository = new TaskRepositoryImpl();

export class TaskController {
  static async getTasksByUser(
    request: AuthenticatedRequest,
    response: Response
  ): Promise<void> {
    const userId = request.params.userId;
    const useCase = new GetUserTasks(taskRepository);

    const tasks = await useCase.execute(userId);
    response.status(HttpStatusCode.OK).json(ApiResponse.success(tasks));
  }

  static async createTask(
    request: AuthenticatedRequest,
    response: Response
  ): Promise<void> {
    const useCase = new CreateTask(taskRepository);
    const id = await useCase.execute(request.body);
    response
      .status(HttpStatusCode.CREATED)
      .json(ApiResponse.success({ id }, "Task created"));
  }
  static async updateTask(
    request: AuthenticatedRequest,
    response: Response
  ): Promise<void> {
    const taskId = request.params.id;
    const useCase = new UpdateTask(taskRepository);
    await useCase.execute(taskId, request.body);

    response
      .status(HttpStatusCode.OK)
      .json(ApiResponse.success(null, "Task updated"));
  }

  static async deleteTask(
    request: AuthenticatedRequest,
    response: Response
  ): Promise<void> {
    const taskId = request.params.id;
    await new DeleteTask(taskRepository).execute(taskId);
    response.status(HttpStatusCode.NO_CONTENT).send();
  }
}
