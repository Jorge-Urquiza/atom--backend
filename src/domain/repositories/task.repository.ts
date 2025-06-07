import { Task } from "../entities/task";

export interface TaskRepository {
  findAllByUser(userId: string): Promise<Task[]>;
  save(task: Task): Promise<string>;
  update(id: string, data: Partial<Task>): Promise<void>;
  delete(id: string): Promise<void>;
}
