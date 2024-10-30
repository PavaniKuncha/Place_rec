/* tslint:disable:max-classes-per-file */
enum QuestionType {
  SINGLE_CHOICE = 0,
  SCALE = 1,
  SINGLE_CHOICE_WITH_TEXT = 2,
  MULTIPLE_CHOICE = 3,
  OPEN_ENDED = 4,
  MULTIPLE_OPEN_ENDED = 5,
}

export interface Question {
  id: string;
  question: string;
  type: QuestionType;
}

export interface ChoiceQuestion extends Question {
  choices: string[];
}

export class MultipleOpenEndedQuestion implements ChoiceQuestion {
  id: string;
  question: string;
  type: QuestionType = QuestionType.MULTIPLE_OPEN_ENDED;
  choices: string[];
}
export class OpenEndedQuestion implements Question {
  id: string;
  question: string;
  type: QuestionType = QuestionType.OPEN_ENDED;
}

export class MultipleChoiceQuestion implements ChoiceQuestion {
  id: string;
  question: string;
  type: QuestionType = QuestionType.MULTIPLE_CHOICE;
  choices: string[];
}

export class SingleChoiceQuestion implements ChoiceQuestion {
  id: string;
  question: string;
  type: QuestionType = QuestionType.SINGLE_CHOICE;
  choices: string[];
}

export class ScaleQuestion implements Question {
  id: string;
  question: string;
  type: QuestionType = QuestionType.SCALE;
}

export class SingleChoiceWithTextQuestion implements ChoiceQuestion {
  id: string;
  question: string;
  type: QuestionType = QuestionType.SINGLE_CHOICE_WITH_TEXT;
  choices: string[];
}
