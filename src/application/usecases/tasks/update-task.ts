import { TaskRepository } from "../../../domain/repositories/task.repository";
import { UpdateTaskDto } from "../../dtos/task/update-task.dto";

export class UpdateTask {
  constructor(private taskRepository: TaskRepository) {}

  async execute(id: string, updateTaskDto: UpdateTaskDto): Promise<void> {
    await this.taskRepository.update(id, updateTaskDto);
  }
}
