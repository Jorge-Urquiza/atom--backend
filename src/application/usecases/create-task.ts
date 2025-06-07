import { Task } from "../../domain/entities/task";
import { TaskRepository } from "../../domain/repositories/task.repository";
import { CreateTaskDto } from "../dtos/create-task.dto";

export class CreateTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(data: CreateTaskDto): Promise<string> {
    const task: Task = {
      ...data,
      completed: false,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null
    };

    return this.taskRepository.save(task);
  }
}