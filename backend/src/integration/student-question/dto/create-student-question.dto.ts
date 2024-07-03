import { Prisma } from '@prisma/client';

export class CreateStudentQuestionDto
  implements Prisma.StudentQuestionCreateInput
{
  id?: string;
  created_at?: string | Date;
  updated_at?: string | Date;
  answer_text?: string;
  is_excluded?: boolean;
  question: Prisma.QuestionCreateNestedOneWithoutStudentQuestionsInput;
  answer?: Prisma.QuestionAnswerCreateNestedOneWithoutStudentQuestionsInput;
  student: Prisma.StudentCreateNestedOneWithoutStudentQuestionsInput;
}
