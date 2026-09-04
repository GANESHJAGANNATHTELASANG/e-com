import database from "../database/db.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(
      new ErrorHandler(
        "User is not authenticated so login again, token is expired or user does not exist",
        401,
      ),
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await database.query(
    "SELECT * FROM users WHERE id = $1 LIMIT 1",
    [decoded.id],
  );

  if (!user.rows.length === 0) {
    return next(
      new ErrorHandler(
        "User is not authenticated so login again, token is expired or user does not exist",
        401,
      ),
    );
  }

  req.user = user.rows[0];

  next();
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403,
        ),
      );
    }
    next();
  };
};
