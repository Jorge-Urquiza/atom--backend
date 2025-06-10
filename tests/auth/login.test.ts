
import { User } from "../../src/domain/entities/user";
import { FindUserByEmail } from "../../src/application/usecases/users/find-user-by-email";
import { GenerateToken } from "../../src/application/usecases/auth/generate-token";
import { UserRepository } from "../../src/domain/repositories/user.repository";


describe("Login Use Case", () => {
  it("should return token if user exists", async () => {
    const mockUser: User = {
      id: "user123",
      email: "test@example.com",
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    };

    const mockRepo: UserRepository = {
      findByEmail: jest.fn().mockResolvedValue(mockUser),
      save: jest.fn(),
    };

    const findUser = new FindUserByEmail(mockRepo);
    const user = await findUser.execute("test@example.com");

    const token = new GenerateToken().execute(user);

    expect(user).toEqual(mockUser);
    expect(typeof token).toBe("string");
    expect(token.length).toBeGreaterThan(0);
  });
});
