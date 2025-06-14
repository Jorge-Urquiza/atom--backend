import { Task } from "../../../domain/entities/task"; 
import { TaskRepository } from "../../../domain/repositories/task.repository"; 
import { CreateTaskDto } from "../../dtos/task/create-task.dto"; 

export class CreateTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(userId: string, createTaskDto: CreateTaskDto): Promise<string> {
    const task: Task = {
      ...createTaskDto,
      userId,
      completed: false,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null
    };
    return this.taskRepository.save(task);
  }
}