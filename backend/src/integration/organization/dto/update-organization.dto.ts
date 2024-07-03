import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationDto } from './create-organization.dto';
import { Prisma } from '@prisma/client';

export class UpdateOrganizationDto
  extends CreateOrganizationDto
  implements Prisma.OrganizationUpdateInput {}
