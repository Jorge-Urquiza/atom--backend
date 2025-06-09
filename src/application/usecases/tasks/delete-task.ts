import { TaskRepository } from "../../../domain/repositories/task.repository";
import { AppError } from "../../../shared/app-error";
import { HttpStatusCode } from "../../../shared/constants/http-status";

export class DeleteTask {
  constructor(private taskRepository: TaskRepository) {}

  async execute(id: string): Promise<void> {
    const exists = await this.taskRepository.findById(id);
    if (!exists) {
      throw new AppError("Task not found", HttpStatusCode.NOT_FOUND);
    }
    await this.taskRepository.delete(id);
  }
}
