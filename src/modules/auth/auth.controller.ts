import { NextFunction, Request, request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authServie } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const { accessToken, refreshToken } = await authServie.loginUser(payload);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24, // 1day
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7, //  7day
    });

    sendResponse(res, {
      success: true,
      message: "User logged in successfully",
      statusCode: httpStatus.OK,
      data: { accessToken, refreshToken },
    });
  },
);

export const authController = {
  loginUser,
};
