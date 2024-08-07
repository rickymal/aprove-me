import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { StudentQuestionService } from './student-question.service';
import { CreateStudentQuestionDto } from './dto/create-student-question.dto';
import { UpdateStudentQuestionDto } from './dto/update-student-question.dto';

@Controller('student-question')
export class StudentQuestionController {
  private readonly logger = new Logger(StudentQuestionController.name);
  constructor(
    private readonly studentQuestionService: StudentQuestionService,
  ) {}

  @Post()
  async create(
    @Body() createStudentQuestionDto: CreateStudentQuestionDto,
  ): Promise<{
    status: string;
  }> {
    const response = await this.studentQuestionService.create(
      createStudentQuestionDto,
    );
    this.logger.log({ response, message: 'student question service response' });
    if (response) {
      return { status: 'created' };
    }

    throw new HttpException(
      'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
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
