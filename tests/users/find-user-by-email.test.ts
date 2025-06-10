import { FindUserByEmail } from "../../src/application/usecases/users/find-user-by-email";
import { UserRepository } from "../../src/domain/repositories/user.repository";
import { AppError } from "../../src/shared/app-error";

describe("FindUserByEmail Use Case", () => {
  it("should throw AppError if user is not found", async () => {
    const mockUserRepository: UserRepository = {
      findByEmail: jest.fn().mockResolvedValue(null),
      save: jest.fn(),
    };

    const useCase = new FindUserByEmail(mockUserRepository);

    await expect(useCase.execute("notfound@example.com")).rejects.toThrow(
      AppError
    );
    await expect(useCase.execute("notfound@example.com")).rejects.toThrow(
      "User not found"
    );
  });

  it("should return a user if found", async () => {
    const mockUser = {
      id: "123",
      email: "test@example.com",
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    };

    const mockUserRepository: UserRepository = {
      findByEmail: jest.fn().mockResolvedValue(mockUser),
      save: jest.fn(),
    };

    const useCase = new FindUserByEmail(mockUserRepository);

    const result = await useCase.execute("test@example.com");
    expect(result).toEqual(
      expect.objectContaining({ email: "test@example.com" })
    );
  });
});
