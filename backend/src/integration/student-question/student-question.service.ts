import { Injectable } from '@nestjs/common';
import { CreateStudentQuestionDto } from './dto/create-student-question.dto';
import { UpdateStudentQuestionDto } from './dto/update-student-question.dto';
import { PrismaService } from '@database/prisma.service';

@Injectable()
export class StudentQuestionService {
  prismaService: PrismaService;

  constructor(prisma: PrismaService) {
    this.prismaService = prisma;
  }

  create(createStudentQuestionDto: CreateStudentQuestionDto) {
    return this.prismaService.studentQuestion.create({
      data: createStudentQuestionDto,
    });
  }

  findAll() {
    return this.prismaService.studentQuestion.findMany();
  }

  findOne(id: string) {
    return this.prismaService.studentQuestion.findFirst({
      where: { id },
    });
  }

  update(id: string, updateStudentQuestionDto: UpdateStudentQuestionDto) {
    return this.prismaService.studentQuestion.update({
      where: { id },
      data: updateStudentQuestionDto,
    });
  }

  remove(id: string) {
    return this.prismaService.studentQuestion.delete({
      where: { id },
    });
  }
}
