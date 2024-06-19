import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { PayableModule } from './payable/payable.module';
import { AssignorModule } from './assignor/assignor.module';
import { OrganizationModule } from './organization/organization.module';
import { OrganizationTestModule } from './organization-test/organization-test.module';

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
          }
        ],
      },
    ]),
    PayableModule,
    AssignorModule,
    OrganizationModule,
    OrganizationTestModule,
  ],
  controllers: [],
})
export class IntegrationModule {}
