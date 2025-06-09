import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./authenticated-request";
import { config } from "../../shared/config";
import { HttpStatusCode } from "../../shared/constants/http-status";
import { AppError } from "../../shared/app-error";

const JWT_SECRET = config.JWT_SECRET;

export function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const header = req.header("Authorization");

  if (!header || !header.startsWith("Bearer ")) {
    throw new AppError(
      "Missing or malformed token",
      HttpStatusCode.UNAUTHORIZED
    );
  }

  const token = header.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.userId = payload.userId;
    next();
  } catch {
    throw new AppError("Invalid or expired token", HttpStatusCode.UNAUTHORIZED);
  }
}
