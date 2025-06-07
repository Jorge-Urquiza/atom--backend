import { Request, Response } from "express";
import { GetUserTasks } from "../../application/usecases/get-user-tasks";
import { TaskRepositoryImpl } from "../repositories/task.repository.impl";
import { CreateTask } from "../../application/usecases/create-task";
import { UpdateTask } from "../../application/usecases/update-task";
import { UpdateTaskDto } from "../../application/dtos/update-task.dto";
import { DeleteTask } from "../../application/usecases/delete-task";

const taskRepository = new TaskRepositoryImpl();

export class TaskController {
  static async getTasksByUser(req: Request, res: Response) {
    const userId = req.params.userId;
    const getUserTasksUseCase = new GetUserTasks(taskRepository);
    try {
      const tasks = await getUserTasksUseCase.execute(userId);
      res.json(tasks);
    } catch (err) {
      console.error("Error en getTasksByUser:", err);
      res.status(500).json({ message: "Error fetching tasks" });
    }
  }

  static async createTask(req: Request, res: Response) {
    const useCase = new CreateTask(taskRepository);

    try {
      const id = await useCase.execute(req.body);
      res.status(201).json({ id });
    } catch (err) {
      console.error("Error en createTask:", err);
      res.status(500).json({ message: "Error creating task", error: err });
    }
  }

  static async updateTask(req: Request, res: Response) {
    const taskId = req.params.id;
    const useCase = new UpdateTask(taskRepository);

    try {
      await useCase.execute(taskId, req.body as UpdateTaskDto);
      res.status(204).send();
    } catch (err) {
      console.error("Error en updateTask:", err);
      res.status(500).json({ message: "Error updating task", error: err });
    }
  }
  static async deleteTask(req: Request, res: Response) {
    const taskId = req.params.id;
    const useCase = new DeleteTask(taskRepository);

    try {
      await useCase.execute(taskId);
      res.status(204).send();
    } catch (err) {
      console.error("Error en deleteTask:", err);
      res.status(500).json({ message: "Error deleting task", error: err });
    }
  }
}
