import { TaskRepository } from "../../../domain/repositories/task.repository";
import { UpdateTaskDto } from "../../dtos/update-task.dto";

export class UpdateTask {
  constructor(private taskRepository: TaskRepository) {}

  async execute(id: string, data: UpdateTaskDto): Promise<void> {
    await this.taskRepository.update(id, data);
  }
}
