import jwt from "jsonwebtoken";
import { User } from "../../../domain/entities/user";
import { config } from "../../../shared/config";
import { HttpStatusCode } from "../../../shared/constants/http-status";
import { AppError } from "../../../shared/app-error";

export class GenerateToken {
  //TODO: move to secret managers.
  private readonly secret = config.JWT_SECRET;
  private readonly expiresIn = "2h";

  execute(user: User): string {
    if (!user?.id || !user?.email) {
      throw new AppError(
        "Invalid user data for token generation",
        HttpStatusCode.BAD_REQUEST
      );
    }

    const payload = {
      userId: user.id,
      email: user.email,
    };

    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }
}
