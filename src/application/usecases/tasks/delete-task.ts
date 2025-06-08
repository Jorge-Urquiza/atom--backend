import { TaskRepository } from "../../../domain/repositories/task.repository";

export class DeleteTask {
  constructor(private taskRepository: TaskRepository) {}

  async execute(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
