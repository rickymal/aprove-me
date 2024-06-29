import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentQuestionService } from './student-question.service';
import { CreateStudentQuestionDto } from './dto/create-student-question.dto';
import { UpdateStudentQuestionDto } from './dto/update-student-question.dto';

@Controller('student-question')
export class StudentQuestionController {
  constructor(
    private readonly studentQuestionService: StudentQuestionService,
  ) {}

  @Post()
  create(@Body() createStudentQuestionDto: CreateStudentQuestionDto) {
    return this.studentQuestionService.create(createStudentQuestionDto);
  }

  @Get()
  findAll() {
    return this.studentQuestionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentQuestionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentQuestionDto: UpdateStudentQuestionDto,
  ) {
    return this.studentQuestionService.update(id, updateStudentQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentQuestionService.remove(id);
  }
}
