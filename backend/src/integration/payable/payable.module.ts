import { Module } from '@nestjs/common';
import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';
import { DatabaseModule } from '@database/database.module';
import { PayableConsumerService } from './payable-consumer/payable-consumer.service';
import { BrokerModule } from '@queue/broker.module';
import { MailerConfigModule } from '@email/mailer.module';
import { SessionModule } from '@auth/session/session-manager.module';

@Module({
  imports: [DatabaseModule, BrokerModule, MailerConfigModule, SessionModule],
  controllers: [PayableController],
  providers: [PayableService, PayableConsumerService],
})
export class PayableModule {}
