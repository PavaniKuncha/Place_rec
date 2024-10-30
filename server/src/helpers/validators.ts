import { IAnswer, ILocation } from "models/answer.model";
import { ChoiceQuestion, Question } from "models/question.model";

const emailRegexp =
  /(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const passwordRegexp = /^(?=.*[A-Za-z])(?=.*\d)([A-Za-z\d\w][^\n ]*){6,}$/;

export function validateEmail(email: string): boolean {
  return emailRegexp.test(email);
}

export function validatePassword(password: string): boolean {
  return passwordRegexp.test(password);
}

export function validateQuestion(arg: any): arg is Question {
  if (!arg) return false;
  if (!arg.id || typeof arg.id !== "string") return false;
  if (!arg.question || typeof arg.question !== "string") return false;
  if (
    arg.type === undefined ||
    typeof arg.type !== "number" ||
    arg.type < 0 ||
    arg.type > 5
  )
    return false;
  return true;
}

export function validateChoiceQuestion(arg: any): arg is ChoiceQuestion {
  if (!validateQuestion(arg)) return false;
  if (
    !(arg as ChoiceQuestion).choices ||
    !Array.isArray((arg as ChoiceQuestion).choices)
  ) {
    throw {
      httpCode: 400,
      message: `question format is incorrect. choices undefined in ${arg.id}`,
      error: new Error(
        `question format is incorrect. choices undefined in ${arg.id}`
      ),
    };
    return false;
  }
  for (const choice in (arg as ChoiceQuestion).choices) {
    if (typeof choice !== "string") {
      throw {
        httpCode: 400,
        message: `question format is incorrect. choice not a string in ${arg.id}`,
        error: new Error(
          `question format is incorrect. choice not a string in ${arg.id}`
        ),
      };
      return false;
    }
  }
  return true;
}

export function validateQuestionArray(arg: any): arg is Question[] {
  if (!Array.isArray(arg)) {
    return false;
  }
  const questionIds = new Set<string>();
  for (const question of arg) {
    if (!validateQuestion(question)) {
      return false;
    }
    if (
      question.type !== 1 &&
      question.type !== 4 &&
      !validateChoiceQuestion(question)
    ) {
      return false;
    }
    if (questionIds.has(question.id)) {
      return false;
    }
    questionIds.add(question.id);
  }

  return true;
}

function arrayOfType(arr: any[], type: string): boolean {
  return arr.every((i) => typeof i === type);
}

export function validateLocation(arg: any): arg is ILocation {
  if (!arg) return false;
  if (arg.longitude === undefined || typeof arg.longitude !== "number") {
    return false;
  }
  if (arg.latitude === undefined || typeof arg.latitude !== "number") {
    return false;
  }
  if (arg.geoid === undefined || typeof arg.geoid !== "string") {
    return false;
  }
  return true;
}

export function validateAnswer(arg: any): arg is IAnswer {
  if (!arg) return false;
  if (!arg.questionId || typeof arg.questionId !== "string") {
    throw {
      httpCode: 400,
      message: `answers format is incorrect. problem with questionId`,
      error: new Error(`answers format is incorrect. problem with questionId`),
    };
    return false;
  }
  if (arg.answer === undefined) {
    throw {
      httpCode: 400,
      message: `answers format is incorrect. answer is undefined in ${arg.questionId}`,
      error: new Error(
        `answers format is incorrect. answer is undefined in ${arg.questionId}`
      ),
    };
    return false;
  }
  if (Array.isArray(arg.answer)) {
    if (
      !arrayOfType(arg.answer, "string") &&
      !arrayOfType(arg.answer, "number")
    ) {
      throw {
        httpCode: 400,
        message: `answers format is incorrect. problem with answer array in ${arg.questionId}`,
        error: new Error(
          `answers format is incorrect. problem with answer array in ${arg.questionId}`
        ),
      };
      return false;
    }
  } else {
    if (typeof arg.answer !== "string" && typeof arg.answer !== "number") {
      throw {
        httpCode: 400,
        message: `answers format is incorrect. problem with answer in ${arg.questionId}`,
        error: new Error(
          `answers format is incorrect. problem with answer in ${arg.questionId}`
        ),
      };
      return false;
    }
  }
  if (arg.choiceIndex === undefined) {
    throw {
      httpCode: 400,
      message: `answers format is incorrect. choice index is undefined in ${arg.questionId}`,
      error: new Error(
        `answers format is incorrect. choice index is undefined in ${arg.questionId}`
      ),
    };
    return false;
  }
  if (
    typeof arg.choiceIndex !== "number" &&
    !(Array.isArray(arg.choiceIndex) && arrayOfType(arg.choiceIndex, "number"))
  ) {
    throw {
      httpCode: 400,
      message: `answers format is incorrect. problem with choice index in ${arg.questionId}`,
      error: new Error(
        `answers format is incorrect. problem with choice index in ${arg.questionId}`
      ),
    };
    return false;
  }

  return true;
}

export function validateAnswerArray(arg: any): arg is IAnswer[] {
  if (!Array.isArray(arg)) {
    return false;
  }

  const questionIds = new Set<string>();
  for (const answer of arg) {
    if (!validateAnswer(answer)) {
      return false;
    }
    if (questionIds.has(answer.questionId)) {
      throw {
        httpCode: 400,
        message: `answers format is incorrect. repeated answer ${answer.questionId}`,
        error: new Error(
          `answers format is incorrect. repeated answer ${answer.questionId}`
        ),
      };
      return false;
    }
    questionIds.add(answer.questionId);
  }
  return true;
}
