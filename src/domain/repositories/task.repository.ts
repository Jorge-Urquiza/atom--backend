import { Task } from "../entities/task";

export interface TaskRepository {
  findById(id: string): Promise<Task | null>;
  findAllByUser(userId: string): Promise<Task[]>;
  save(task: Task): Promise<string>;
  update(id: string, data: Partial<Task>): Promise<void>;
  delete(id: string): Promise<void>;
}
