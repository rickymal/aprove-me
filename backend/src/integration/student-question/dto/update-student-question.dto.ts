import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentQuestionDto } from './create-student-question.dto';

export class UpdateStudentQuestionDto extends PartialType(
  CreateStudentQuestionDto,
) {}
