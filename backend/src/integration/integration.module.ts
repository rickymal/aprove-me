import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { PayableModule } from './payable/payable.module';
import { AssignorModule } from './assignor/assignor.module';
import { OrganizationModule } from './organization/organization.module';
import { OrganizationTestModule } from './organization-test/organization-test.module';
import { QuestionModule } from './question/question.module';
import { StudentModule } from './student/student.module';
import { StudentQuestionModule } from './student-question/student-question.module';
import { TestQuestionModule } from './test-question/test-question.module';
import { TestQuestion } from './test-question/entities/test-question.entity';


@Module({
  imports: [
    RouterModule.register([
      {
        path: 'integration',
        children: [
          {
            path: 'payable',
            module: PayableModule,
          },
          {
            path: 'assignor',
            module: AssignorModule,
          },
          {
            path: "organization",
            module: OrganizationModule,
          },
          {
            path: "organization-test",
            module: OrganizationTestModule,
          },
          {
            path: "question",
            module: QuestionModule,
          },
          {
            path: "/",  // Eu passei o caminho no controller.
            module: StudentModule,
          },
          {
            path: "/",
            module: StudentQuestionModule
          },
          {
            path: "/",
            module: TestQuestion,
          }
        ],
      },
    ]),
    PayableModule,
    AssignorModule,
    OrganizationModule,
    OrganizationTestModule,
    QuestionModule,
    StudentModule,
    StudentQuestionModule,
    TestQuestion,
    TestQuestionModule,
  ],
  controllers: [],
})
export class IntegrationModule {}
