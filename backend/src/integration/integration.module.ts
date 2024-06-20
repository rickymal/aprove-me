import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { PayableModule } from './payable/payable.module';
import { AssignorModule } from './assignor/assignor.module';
import { OrganizationModule } from './organization/organization.module';
import { OrganizationTestModule } from './organization-test/organization-test.module';
import { QuestionModule } from './question/question.module';
import { StudentModule } from './student/student.module';

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
  ],
  controllers: [],
})
export class IntegrationModule {}
