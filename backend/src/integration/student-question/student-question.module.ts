import { Module } from '@nestjs/common';
import { StudentQuestionService } from './student-question.service';
import { StudentQuestionController } from './student-question.controller';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [StudentQuestionController],
  providers: [StudentQuestionService],
})
export class StudentQuestionModule {}
