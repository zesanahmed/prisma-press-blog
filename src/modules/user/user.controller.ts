import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";
import httpStatus from "http-status";
import { userService } from "./user.service";

const registerUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const user = await userService.registerUserIntoDB(payload);

    res.status(httpStatus.CREATED).json({
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Registered Successfully",
      data: {
        user,
      },
    });
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

export const userController = {
  registerUser,
};
