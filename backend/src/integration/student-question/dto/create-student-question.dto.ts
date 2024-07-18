import { Prisma } from '@prisma/client';

export class CreateStudentQuestionDto
{
  id?: string;
  created_at?: string | Date;
  updated_at?: string | Date;
  answer_text?: string;
  question: Prisma.QuestionCreateNestedOneWithoutStudentQuestionsInput;
  marked_answers?: Array<{ id: string; is_correct: boolean }>;
  student: Prisma.StudentCreateNestedOneWithoutStudentQuestionsInput;
}
