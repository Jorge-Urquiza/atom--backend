import { Request, Response, NextFunction } from "express";
import { AppError } from "./app-error";
import { ApiResponse } from "./api-response";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err instanceof AppError) {
    res
      .status(err.statusCode)
      .json(ApiResponse.error(err.message, "error"));
  } else {
    console.error("Unhandled error:", err);
    res.status(500).json(ApiResponse.error("Internal server error"));
  }
}
