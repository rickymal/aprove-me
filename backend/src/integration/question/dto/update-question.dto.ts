import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionDto } from './create-question.dto';
import { Prisma } from '@prisma/client';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) implements Prisma.QuestionUpdateInput {}
