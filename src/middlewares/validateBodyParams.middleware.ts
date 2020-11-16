import { Request, Response, NextFunction, RequestHandler } from "express";
import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";

export default function validateBodyParams(type: any): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    validate(plainToClass(type, req.body)).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors
          .map((err: ValidationError) => `Missing body param: ${err.property}`)
          .join(", ");
        next(new Error(message));
      } else {
        next();
      }
    });
  };
}
