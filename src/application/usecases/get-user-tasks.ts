import { TaskRepository } from "../../domain/repositories/task.repository";

export class GetUserTasks  {
  constructor(private taskRepository: TaskRepository) {}

  async execute(userId: string) {
    return this.taskRepository.findAllByUser(userId);
  }
}