import { Module } from '@nestjs/common';
import { OrganizationTestService } from './organization-test.service';
import { OrganizationTestController } from './organization-test.controller';
import { PrismaService } from '@database/prisma.service';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [OrganizationTestController],
  providers: [OrganizationTestService],
})
export class OrganizationTestModule {}
