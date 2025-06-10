import { GetTasks } from './../../src/application/usecases/tasks/get-tasks';
import { Task } from "../../src/domain/entities/task";
import { TaskRepository } from "../../src/domain/repositories/task.repository";

describe('GetTasks Use Case', () => {
  it('should return tasks for a valid user ID', async () => {
    const userId = 'user-123';
    const mockTasks: Task[] = [
      {
        id: 'task-1',
        userId,
        title: 'Title task 1',
        description: 'Task descripton',
        completed: false,
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null
      }
    ];

    const mockTaskRepository: TaskRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAllByUser: jest.fn().mockResolvedValue(mockTasks),
      update: jest.fn(),
      delete: jest.fn()
    };

    const useCase = new GetTasks(mockTaskRepository);
    const result = await useCase.execute(userId);

    expect(result).toEqual(mockTasks);
    expect(mockTaskRepository.findAllByUser).toHaveBeenCalledWith(userId);
  });

  it('should throw if userId is not provided', async () => {
    const mockTaskRepository: TaskRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAllByUser: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    };

    const useCase = new GetTasks(mockTaskRepository);

    await expect(useCase.execute('')).rejects.toThrow('Unauthorized');
  });
});