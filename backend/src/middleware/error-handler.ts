import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app.error";
import { HttpError } from "../errors/http.error";
import { StatusCodes } from "http-status-codes";

export default (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      error: err.message,
      stack: err.stack,
    });
  }

  if (err instanceof AppError) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: err.stack,
    });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: "Unknown error",
    stack: err.stack,
  });
};
