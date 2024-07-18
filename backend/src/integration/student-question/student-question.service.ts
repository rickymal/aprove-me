import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateStudentQuestionDto } from './dto/create-student-question.dto';
import { UpdateStudentQuestionDto } from './dto/update-student-question.dto';
import { PrismaService } from '@database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class StudentQuestionService {
  prismaService: PrismaService;
  private readonly logger = new Logger('StudentQuestionService');

  constructor(prisma: PrismaService) {
    this.prismaService = prisma;
    
  }

  async create(createStudentQuestionDto: CreateStudentQuestionDto) {
    if (
      !createStudentQuestionDto.marked_answers &&
      !createStudentQuestionDto.answer_text
    ) {
      throw new HttpException(
        'You must provide at least one of the following fields: markedAnswers or answer_text',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (createStudentQuestionDto.marked_answers) {
      const dataToBeLoaded: Prisma.StudentQuestionCreateManyInput[] =
        createStudentQuestionDto.marked_answers.map((marked_answer) => {
          if (!marked_answer.id) {
            throw new HttpException(
              'You must provide an id for each marked answer',
              HttpStatus.BAD_REQUEST,
            );
          }

          if (typeof marked_answer.is_correct !== 'boolean') {
            throw new HttpException(
              'You must provide a boolean value for is_correct',
              HttpStatus.BAD_REQUEST,
            );
          }

          const data: Prisma.StudentQuestionCreateManyInput = {
            answer_text: '',
            is_excluded: marked_answer.is_correct,
            question_id: createStudentQuestionDto.question.connect.id,
            answer_id: marked_answer.id,
            student_id: createStudentQuestionDto.student.connect.id,
          };
          return data;
        });

      this.logger.log({ dataToBeLoaded, message: 'data bulk to be created' });
      return this.prismaService.studentQuestion.createMany({
        data: dataToBeLoaded,
      });
    }
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
