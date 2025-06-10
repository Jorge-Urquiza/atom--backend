import { DeleteTask } from "./../../src/application/usecases/tasks/delete-task";
import { Task } from "../../src/domain/entities/task";
import { TaskRepository } from "../../src/domain/repositories/task.repository";

describe("DeleteTask Use Case", () => {
  const existingTask: Task = {
    id: "task-1",
    userId: "user-123",
    title: "Task title",
    description: "Task description",
    completed: false,
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
  };

  it("should delete a task if it exists", async () => {
    const mockTaskRepository: TaskRepository = {
      findById: jest.fn().mockResolvedValue(existingTask),
      delete: jest.fn(),
      save: jest.fn(),
      findAllByUser: jest.fn(),
      update: jest.fn(),
    };

    const useCase = new DeleteTask(mockTaskRepository);
    await useCase.execute("task-1");

    expect(mockTaskRepository.findById).toHaveBeenCalledWith("task-1");
    expect(mockTaskRepository.delete).toHaveBeenCalledWith("task-1");
  });

  it("should throw an error if task does not exist", async () => {
    const mockTaskRepository: TaskRepository = {
      findById: jest.fn().mockResolvedValue(null),
      delete: jest.fn(),
      save: jest.fn(),
      findAllByUser: jest.fn(),
      update: jest.fn(),
    };

    const useCase = new DeleteTask(mockTaskRepository);

    await expect(useCase.execute("doesnt-exist-id")).rejects.toThrow(
      "Task not found"
    );
  });
});
