import { Prisma } from "@prisma/client";


export class CreateOrganizationTestDto implements Prisma.TestCreateInput {
    id?: string | undefined;
    name: string;
    description?: string | null | undefined;
    created_at?: string | Date | undefined;
    updated_at?: string | Date | undefined;
    organization: Prisma.OrganizationCreateNestedOneWithoutTestsInput;
    questions?: Prisma.QuestionCreateNestedManyWithoutTestInput | undefined;
}
