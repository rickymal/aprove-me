import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from '@database/prisma.service';

@Injectable()
export class StudentService {
  prismaService: PrismaService;

  constructor(prisma : PrismaService) {
    this.prismaService = prisma
  }

  create(createStudentDto: CreateStudentDto) {
    return this.prismaService.student.create({
      data: createStudentDto,
    });
  }

  findAll() {
    return this.prismaService.student.findMany();
  }

  findOne(id: string) {
    return this.prismaService.student.findFirst({
      where: { id },
    })
  }

  update(id: string, updateStudentDto: UpdateStudentDto) {
    return this.prismaService.student.update({
      where: { id },
      data: updateStudentDto,
    });
  }

  remove(id: string) {
    return this.prismaService.student.delete({
      where: { id },
    });
  }
}
