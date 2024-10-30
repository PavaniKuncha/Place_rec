import { Schema, model } from "mongoose";
import { IAnswers, AnswersSchema } from "models/answer.model";

export interface IUser {
  email: string;
  phoneNumber?: string;
  firstName: string;
  lastName: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  longAddress?: string;
  longCity?: string;
  longState?: string;
  longZip?: string;
  gender?: string;
  race?: string;
  education?: string;
  occupation?: string;
  numberOfMoves?: string;
  personalHistoryIllness?: string[];
  familyHistoryIllness?: string[];
  birthday?: Date;
  wakeTime: Date;
  sleepTime: Date;

  answers: IAnswers[];

  password: string;
  resetCode?: string;
  resetTries?: number;
  admin: boolean;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  longAddress: { type: String },
  longCity: { type: String },
  longState: { type: String },
  longZip: { type: String },
  gender: { type: String },
  race: { type: String },
  education: { type: String },
  occupation: { type: String },
  numberOfMoves: { type: String },
  personalHistoryIllness: { type: [String] },
  familyHistoryIllness: { type: [String] },
  birthday: { type: Date },
  wakeTime: { type: Date, required: true },
  sleepTime: { type: Date, required: true },
  resetCode: { type: String, required: false },
  resetTries: { type: Number, required: false },
  admin: { type: Boolean, default: false },
  answers: [AnswersSchema],
});

export default model<IUser>("User", UserSchema);
