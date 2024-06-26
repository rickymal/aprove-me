import { Prisma } from '@prisma/client';

class Answer
  implements Prisma.QuestionAnswerCreateNestedManyWithoutQuestionInput {}

export class CreateQuestionDto implements Prisma.QuestionCreateInput {
  id?: string;
  created_at?: string | Date;
  updated_at?: string | Date;
  question_text: string;
  test: Prisma.TestCreateNestedOneWithoutQuestionsInput;
  categories?: Prisma.QuestionCategoryCreateNestedManyWithoutQuestionInput;
  answers?: Prisma.QuestionAnswerCreateNestedManyWithoutQuestionInput;
  feedbacks?: Prisma.QuestionFeedbackCreateNestedManyWithoutQuestionInput;
  studentQuestions?: Prisma.StudentQuestionCreateNestedManyWithoutQuestionInput;
}
