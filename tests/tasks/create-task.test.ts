import { CreateTask } from './../../src/application/usecases/tasks/create-task';
import { CreateTaskDto } from './../../src/application/dtos/task/create-task.dto';
import { TaskRepository } from './../../src/domain/repositories/task.repository';

describe('CreateTask usecase', () => {
  it('should create a task and return its ID', async () => {
    const fakeTaskId = 'task-123';
    const mockTaskRepository: TaskRepository = {
      save: jest.fn().mockResolvedValue(fakeTaskId),
      findById: jest.fn(),
      findAllByUser: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    };

    const userId = 'user-1';
    const dto: CreateTaskDto = {
      title: 'Test task',
      description: 'A simple test task for atom'
    };

    const useCase = new CreateTask(mockTaskRepository);
    const taskId = await useCase.execute(userId, dto);

    expect(taskId).toBe(fakeTaskId);
    expect(mockTaskRepository.save).toHaveBeenCalled();
  });
});