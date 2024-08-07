import { Module } from '@nestjs/common';
import { TestQuestionService } from './test-question.service';
import { TestQuestionController } from './test-question.controller';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TestQuestionController],
  providers: [TestQuestionService],
})
export class TestQuestionModule {}
