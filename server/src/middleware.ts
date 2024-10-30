import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import User, { IUser } from "models/user.model";

import authObj from "config/auth.json";

const tokenSecret: string = authObj.tokenSecret;

export async function verify(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (!token) res.status(401).json({ error: "please provide a token" });
  else {
    try {
      const decoded = jwt.verify(token, tokenSecret);
      const { email, password } = decoded as JwtPayload;
      const user: IUser = await User.findOne({ email, password });
      req.currentUser = user;
      next();
    } catch (error) {
      res.status(500).json({ error: "failed to authenticate token" });
    }
  }
}
