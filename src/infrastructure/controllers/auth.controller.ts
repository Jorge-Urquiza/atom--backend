import { Request, Response } from "express";
import { GenerateToken } from "../../application/usecases/auth/generate-token";
import { FindUserByEmail } from "../../application/usecases/users/find-user-by-email";
import { UserRepositoryImpl } from "../repositories/user.repository.impl";

const userRepository = new UserRepositoryImpl();

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email } = req.body as { email: string };
      const findUser = new FindUserByEmail(userRepository);
      const user = await findUser.execute(email);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      const token = new GenerateToken().execute(user);

      res.status(200).json({ token, user });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ message: "Login failed", error: err });
    }
  }
}
