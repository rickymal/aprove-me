import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from '@database/prisma.service';

@Injectable()
export class QuestionService {
  prismaService: PrismaService;

  constructor(prisma : PrismaService) {
    this.prismaService = prisma 
  }
  create(createQuestionDto: CreateQuestionDto) {
    return this.prismaService.question.create({
      data: createQuestionDto,
    });
  }

  findAll() {
    return this.prismaService.question.findMany();
  }

  findOne(id: string) {
    return this.prismaService.question.findUnique({
      where: { id: id },
    });
  }

  update(id: string, updateQuestionDto: UpdateQuestionDto) {
    return this.prismaService.question.update({
      where: { id: id },
      data: updateQuestionDto,
    });
  }

  remove(id: string) {
    return this.prismaService.question.delete({
      where: { id: id },
    });
  }
}
