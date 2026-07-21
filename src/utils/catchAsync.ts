import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";

export const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.log(error);
      res.status(httpStatus.CREATED).json({
        success: false,
        statusCode: httpStatus.CREATED,
        message: "Failed to Register User",
        error: (error as Error).message,
      });
    }
  };
};
