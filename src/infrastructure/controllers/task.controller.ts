import { Response } from "express";

import { TaskRepositoryImpl } from "../repositories/task.repository.impl";

import { GetTasks } from "../../application/usecases/tasks/get-tasks";
import { CreateTask } from "../../application/usecases/tasks/create-task";
import { UpdateTask } from "../../application/usecases/tasks/update-task";
import { DeleteTask } from "../../application/usecases/tasks/delete-task";
import { AuthenticatedRequest } from "../middleware/authenticated-request";
import { HttpStatusCode } from "../../shared/constants/http-status";
import { ApiResponse } from "../../shared/api-response";
import { AppError } from "../../shared/app-error";
import { CreateTaskDto } from "../../application/dtos/task/create-task.dto";
import { UpdateTaskDto } from "../../application/dtos/task/update-task.dto";

const taskRepository = new TaskRepositoryImpl();

export class TaskController {
  static async getTasks(
    request: AuthenticatedRequest,
    response: Response
  ): Promise<void> {
    const userId = request.userId ?? '';
    const useCase = new GetTasks(taskRepository);
    const tasks = await useCase.execute(userId);
    response.status(HttpStatusCode.OK).json(ApiResponse.success(tasks));
  }

  static async createTask(
    request: AuthenticatedRequest,
    response: Response
  ): Promise<void> {
    const userId = request.userId ?? '';
    const createTaskDto: CreateTaskDto = request.body;
    const useCase = new CreateTask(taskRepository);
    const id = await useCase.execute(userId, createTaskDto);
    response
      .status(HttpStatusCode.CREATED)
      .json(ApiResponse.success({ id }, "Task created"));
  }
  static async updateTask(
    request: AuthenticatedRequest,
    response: Response
  ): Promise<void> {
    const taskId = request.params.id;
    const updateTaskDto: UpdateTaskDto = request.body;
    const useCase = new UpdateTask(taskRepository);
    await useCase.execute(taskId, updateTaskDto);

    response
      .status(HttpStatusCode.OK)
      .json(ApiResponse.success(null, "Task updated"));
  }

  static async deleteTask(
    request: AuthenticatedRequest,
    response: Response
  ): Promise<void> {
    const taskId = request.params.id;
    if (!taskId || typeof taskId !== 'string') {
      throw new AppError("Task ID is required", HttpStatusCode.BAD_REQUEST);
    }
    await new DeleteTask(taskRepository).execute(taskId);
    response.status(HttpStatusCode.NO_CONTENT).send();
  }
}
