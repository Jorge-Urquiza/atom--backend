import { UpdateTaskDto } from "../../src/application/dtos/task/update-task.dto";
import { UpdateTask } from "../../src/application/usecases/tasks/update-task";
import { TaskRepository } from "../../src/domain/repositories/task.repository";

describe("UpdateTask Use Case", () => {
  it("should call repository to update task", async () => {
    const mockTaskRepository: TaskRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAllByUser: jest.fn(),
      update: jest.fn().mockResolvedValue(undefined),
      delete: jest.fn(),
    };

    const useCase = new UpdateTask(mockTaskRepository);

    const taskId = "task-123";
    const dto: UpdateTaskDto = {
      title: "Updated title",
      completed: true,
    };

    await useCase.execute(taskId, dto);

    expect(mockTaskRepository.update).toHaveBeenCalledWith(taskId, dto);
  });
});
