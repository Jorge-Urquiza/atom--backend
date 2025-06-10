import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { AppError } from "./app-error";
import { HttpStatusCode } from "./constants/http-status";

export function validateDto<T extends object>(dtoClass: new () => T) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const dtoObject = plainToInstance(dtoClass, req.body);

    const errors = await validate(dtoObject, {
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      const message =
        Object.values(errors[0].constraints ?? {})[0] || 'Datos inválidos';
      return next(new AppError(message, HttpStatusCode.BAD_REQUEST));
    }
    req.body = dtoObject;
    next();
  };
}