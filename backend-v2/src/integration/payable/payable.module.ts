import { Module } from '@nestjs/common';
import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PayableConsumerService } from './payable-consumer/payable-consumer.service';
import { BrokerModule } from 'src/queue/broker.module';
import { MailerConfigModule } from 'src/email/mailer.module';

@Module({
  imports: [DatabaseModule, BrokerModule, MailerConfigModule],
  controllers: [PayableController],
  providers: [PayableService, PayableConsumerService],
})
export class PayableModule {}
