import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationTestDto } from './create-organization-test.dto';
import { Prisma } from '@prisma/client';

export class UpdateOrganizationTestDto extends PartialType(CreateOrganizationTestDto) implements Prisma.TestUpdateInput {}
