import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../shared/constants/http-status";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error("Error 💥:", err);

  const status = err.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    status: "error",
    message,
    stack: err.stack,
  });
}
