import { NextFunction, Request, Response } from "express";
import { LogRepository } from "../../repositories/log.repository";
import handler from "./handler";

export default async (req: Request, res: Response, next: NextFunction) => {
  const logRepository = new LogRepository();

  const data = await handler({ data: req.body, logRepository });

  res.json(data);
};
