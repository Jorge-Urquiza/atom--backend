import { HttpStatusCode } from "./constants/http-status";

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR
  ) {
    super(message);
  }
}
