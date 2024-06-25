import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestQuestionService } from './test-question.service';
import { CreateTestQuestionDto } from './dto/create-test-question.dto';
import { UpdateTestQuestionDto } from './dto/update-test-question.dto';

@Controller('test-question')
export class TestQuestionController {
  constructor(private readonly testQuestionService: TestQuestionService) {
    this.testQuestionService = testQuestionService
  }

  @Post()
  create(@Body() createTestQuestionDto: CreateTestQuestionDto) {
    return this.testQuestionService.create(createTestQuestionDto);
  }

  @Get()
  findAll() {
    return this.testQuestionService.findAll();
  }

  @Get('names')
  findAllNames() {
    return this.testQuestionService.findAllNames();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testQuestionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestQuestionDto: UpdateTestQuestionDto) {
    return this.testQuestionService.update(id, updateTestQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testQuestionService.remove(id);
  }
}
