import { TaskRepository } from "../../../domain/repositories/task.repository";

export class GetUserTasks  {
  constructor(private taskRepository: TaskRepository) {}

  async execute(userId: string) {
    const tasks = await this.taskRepository.findAllByUser(userId);
    return tasks;
  }
}