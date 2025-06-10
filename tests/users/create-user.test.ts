import { AppError } from '../../src/shared/app-error';
import { CreateUser } from '../../src/application/usecases/users/create-user';
import { UserRepository } from '../../src/domain/repositories/user.repository';
import { HttpStatusCode } from '../../src/shared/constants/http-status';

describe('CreateUser', () => {
  let mockRepository: jest.Mocked<UserRepository>;
  let createUser: CreateUser;

  beforeEach(() => {
    mockRepository = {
      findByEmail: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<UserRepository>;

    createUser = new CreateUser(mockRepository);
  });

  it('should throw an error if the email already exists', async () => {
    mockRepository.findByEmail.mockResolvedValueOnce(null);
    mockRepository.save.mockResolvedValueOnce('abc123');

    const result = await createUser.execute({ email: 'test@example.com' });

    expect(mockRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
    expect(mockRepository.save).toHaveBeenCalled();
    expect(result).toEqual({
      id: 'abc123',
      email: 'test@example.com',
      createdAt: expect.any(Date),
      updatedAt: null,
      deletedAt: null,
    });
  });

  it('should create a user if the email does not exist', async () => {
    mockRepository.findByEmail.mockResolvedValueOnce({
      id: 'existing-id',
      email: 'test@example.com',
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    });

    await expect(
      createUser.execute({ email: 'test@example.com' })
    ).rejects.toEqual(
      new AppError('Email is already in use', HttpStatusCode.CONFLICT)
    );
  });
});
