import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';
import { Prisma } from '@prisma/client';

export class UpdateStudentDto extends PartialType(CreateStudentDto) implements Prisma.StudentUpdateInput {}
