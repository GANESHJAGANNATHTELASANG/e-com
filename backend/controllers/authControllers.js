import ErrorHandler from "../middlewares/errorMiddleware.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import database from "../database/db.js";
import { generateToken } from "../utils/jwtToken.js";
import bcrypt from "bcrypt";
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("Please enter all feilds", 400));
  }

  const isExistingUser = await database.query(
    "SELECT * FROM users WHERE email = $1",
    [email],
  );

  if (isExistingUser.rows.length > 0) {
    return next(new ErrorHandler("User already exist with this email", 400));
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await database.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, hashPassword],
  );

  console.log("user", user.rows[0]);

  generateToken(user.rows[0], "User is created successfully", 201, res);
});

export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }

  const user = await database.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (user.rows.length === 0) {
    return next(new ErrorHandler("User does not exist with this email", 400));
  }
  generateToken(user.rows[0], "User is logged in successfully", 200, res);
});

export const getUser = catchAsyncErrors(async (req, res, next) => {
  const { user } = req;
  res.status(200).json({
    success: true,
    user,
  });
});

export const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User is logged out successfully",
    });
});
