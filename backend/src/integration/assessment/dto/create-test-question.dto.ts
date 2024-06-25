import { Prisma } from "@prisma/client";

export class CreateTestQuestionDto implements Prisma.TestCreateInput {
    id?: string;
    name: string;
    description?: string;
    created_at?: string | Date;
    updated_at?: string | Date;
    organization: Prisma.OrganizationCreateNestedOneWithoutTestsInput;
    questions?: Prisma.QuestionCreateNestedManyWithoutTestInput;
}