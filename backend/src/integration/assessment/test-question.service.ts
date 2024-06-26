import { Injectable } from '@nestjs/common';
import { CreateTestQuestionDto } from './dto/create-test-question.dto';
import { UpdateTestQuestionDto } from './dto/update-test-question.dto';
import { PrismaService } from '@database/prisma.service';

@Injectable()
export class TestQuestionService {
  prismaService: PrismaService;

  constructor(prisma: PrismaService) {
    this.prismaService = prisma;
  }

  create(createTestQuestionDto: CreateTestQuestionDto) {
    return this.prismaService.test.create({
      data: createTestQuestionDto,
    });
  }

  findAll() {
    return this.prismaService.test.findMany();
  }

  findAllNames() {
    return this.prismaService.test.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }

  findOne(id: string) {
    throw new Error('Not implemented');
  }

  findByTestId(id: string) {
    return this.prismaService.test.findMany({
      where: {},
    });
  }

  update(id: string, updateTestQuestionDto: UpdateTestQuestionDto) {
    throw new Error('Not implemented');
  }

  remove(id: string) {
    throw new Error('Not implemented');
  }
}
