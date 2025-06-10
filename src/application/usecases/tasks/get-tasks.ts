import { TaskRepository } from "../../../domain/repositories/task.repository";
import { AppError } from "../../../shared/app-error";
import { HttpStatusCode } from "../../../shared/constants/http-status";

export class GetTasks  {
  constructor(private taskRepository: TaskRepository) {}

  async execute(userId: string) {
     if (!userId) {
      throw new AppError("Unauthorized", HttpStatusCode.UNAUTHORIZED);
    }
    const tasks = await this.taskRepository.findAllByUser(userId);
    return tasks;
  }
}