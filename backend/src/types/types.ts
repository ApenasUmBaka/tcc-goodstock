// Libs
import { NextFunction, Request, Response } from "express";

// Types
export type _ExpressMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
