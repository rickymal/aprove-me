import { Prisma } from "@prisma/client";

export class CreateOrganizationDto implements Prisma.OrganizationCreateInput {
    id?: string;
    name: string;
    description?: string;
    email?: string;
    website?: string;
    phone?: string;
    logo?: string;
    cover?: string;
    logo_url?: string;
    cover_url?: string;
    created_at?: string | Date;
    updated_at?: string | Date;
    students?: Prisma.StudentCreateNestedManyWithoutOrganizationsInput;
    tests?: Prisma.TestCreateNestedManyWithoutOrganizationInput;
}
