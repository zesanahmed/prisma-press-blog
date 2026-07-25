import { NextFunction, Request, request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authServie } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const loginResult = await authServie.loginUser(payload);

    sendResponse(res, {
      success: true,
      message: "User logged in successfully",
      statusCode: httpStatus.OK,
      data: loginResult,
    });
  },
);

export const authController = {
  loginUser,
};
