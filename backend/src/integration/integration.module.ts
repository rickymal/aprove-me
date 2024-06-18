import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { PayableModule } from './payable/payable.module';
import { AssignorModule } from './assignor/assignor.module';
import { OrganizationModule } from './organization/organization.module';

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
          }
        ],
      },
    ]),
    PayableModule,
    AssignorModule,
    OrganizationModule,
  ],
  controllers: [],
})
export class IntegrationModule {}
