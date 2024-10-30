import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

import User, { IUser } from "models/user.model";
import { verify } from "middleware";
import { sendEmail } from "helpers/nodemailer";
import { validateEmail, validatePassword } from "helpers/validators";
import authObj from "config/auth.json";

const rounds = 10;
const tokenSecret: string = authObj.tokenSecret;

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user: IUser = await User.findOne({ email });
    if (!user) {
      throw {
        code: 404,
        message: `user with email ${email} not found.`,
        error: new Error(`user with email ${email} not found.`),
      };
    }
    const isMatch: boolean = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.status(200).json({ token: generateToken(user) });
    } else {
      throw {
        code: 401,
        message: `passwords do not match.`,
        error: new Error(`passwords do not match.`),
      };
    }
  } catch (error: any) {
    res.status(error.code || 500).json(error);
  }
});

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!validateEmail(email)) {
      throw {
        code: 400,
        message: `email string "${email}" is not a valid email`,
        error: `email string "${email}" is not a valid email`,
      };
    }
    if (!validatePassword(password)) {
      throw {
        code: 400,
        message: `password string does not match constraints`,
        error: `password string does not match constraints`,
      };
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw {
        message: `user with email "${email}" already exists!`,
        error: new Error(`user with email "${email}" already exists!`),
      };
    }
    const hash = await bcrypt.hash(password, rounds);
    const newUser = new User({
      email,
      password: hash,
      phoneNumber: req.body.phoneNumber,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      gender: req.body.gender,
      race: req.body.race,
      birthday: req.body.birthday,
      wakeTime: req.body.wakeTime,
      sleepTime: req.body.sleepTime,
    });
    const user = await newUser.save();
    res.status(200).json({ token: generateToken(user) });
  } catch (error: any) {
    res.status(error.code || 500).json(error);
  }
});

router.put("/update", verify, async (req: Request, res: Response) => {
  try {
    if (
      "password" in req.body ||
      "resetCode" in req.body ||
      "resetTries" in req.body ||
      "admin" in req.body ||
      "answers" in req.body
    ) {
      throw {
        code: 401,
        message: `field not allowed to be updated`,
        error: new Error(`field not allowed to be updated`),
      };
    }
    await User.updateOne({ email: req.currentUser.email }, { $set: req.body });
    res.status(200).json({ updatedUser: true });
  } catch (error: any) {
    res.status(error.code || 500).json(error);
  }
});

router.get("/get-reset", async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    if (!user) {
      throw {
        code: 404,
        message: `user with email ${email} not found.`,
        error: new Error(`user with email ${email} not found.`),
      };
    }
    user.resetCode = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");
    user.resetTries = 0;
    await user.save();
    sendEmail({
      subject: "[Place&Recovery] Reset Password",
      text: `Your reset code is ${user.resetCode}`,
      to: user.email,
      from: authObj.google.email,
    });
    res.status(200).json({
      message: `Reset code sent to "${email}"`,
    });
  } catch (error: any) {
    res.status(error.code || 500).json(error);
  }
});

router.post("/resetpassword", async (req: Request, res: Response) => {
  try {
    const {
      email,
      resetCode,
      newPassword,
    }: { email: string; resetCode: string; newPassword: string } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw {
        code: 404,
        message: `user with email ${email} not found.`,
        error: new Error(`user with email ${email} not found.`),
      };
    }
    if (user.resetTries === undefined || user.resetTries >= 3) {
      throw {
        code: 401,
        message: `number of reset tries exceeded. please request a new reset code.`,
        error: new Error(
          `number of reset tries exceeded. please request a new reset code.`
        ),
      };
    }
    if (!user.resetCode || user.resetCode !== resetCode) {
      user.resetTries++;
      await user.save();
      throw {
        code: 401,
        message: `reset code for email ${email} is incorrect`,
        error: new Error(`reset code for email ${email} is incorrect`),
      };
    }
    if (!validatePassword(newPassword)) {
      throw {
        code: 400,
        message: `password string does not match constraints`,
        error: `password string does not match constraints`,
      };
    }

    const hash = await bcrypt.hash(newPassword, rounds);
    user.resetCode = undefined;
    user.password = hash;
    await user.save();
    res.status(200).json({
      message: `Password for "${email}" is reset!`,
    });
  } catch (error: any) {
    res.status(error.code || 500).json(error);
  }
});

router.get("/user", verify, (req, res: Response) => {
  res.status(200).json(req.currentUser);
});

router.get("/jwt-test", verify, (req, res: Response) => {
  res.status(200).json(req.currentUser);
});

function generateToken(user: IUser) {
  return jwt.sign(
    {
      email: user.email,
      password: user.password,
    },
    tokenSecret,
    { expiresIn: "24h" }
  );
}

export default router;
