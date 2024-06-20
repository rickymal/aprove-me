import { Prisma } from "@prisma/client";

export class CreateStudentDto implements Prisma.StudentCreateInput {
    name: string;
    id?: string;
    user: Prisma.UserCreateNestedOneWithoutStudentInput;
    organizations?: Prisma.OrganizationCreateNestedManyWithoutStudentsInput;
    questionFeedbacks?: Prisma.QuestionFeedbackCreateNestedManyWithoutStudentInput;
    studentQuestions?: Prisma.StudentQuestionCreateNestedManyWithoutStudentInput;
}
