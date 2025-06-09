import { Task } from "../../../domain/entities/task"; 
import { TaskRepository } from "../../../domain/repositories/task.repository"; 
import { CreateTaskDto } from "../../dtos/task/create-task.dto"; 

export class CreateTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(createTaskDto: CreateTaskDto): Promise<string> {
    const task: Task = {
      ...createTaskDto,
      completed: false,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null
    };

    return this.taskRepository.save(task);
  }
}