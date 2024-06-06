import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Payable } from '@prisma/client';
import { RabbitMqFactoryService, RabbitMqProducer } from '@queue/rabbit-mq.service';
import { CreatePayableDto } from '../dto/create-payable.dto';
import { MailerService } from '@email/mailer.service';
import { PayableService } from '../payable.service';

@Injectable()
export class PayableConsumerService implements OnModuleInit {
    private readonly logger = new Logger(PayableConsumerService.name);
    producerBacklog: RabbitMqProducer<CreatePayableDto>;
    
    constructor(private readonly rabbitMqFactoryService: RabbitMqFactoryService, private readonly mailerService : MailerService, private readonly payableService : PayableService) { 
        
    }

    onModuleInit() {

        this.producerBacklog = this.rabbitMqFactoryService.createProducer<CreatePayableDto>('payables-death');

        const consumer = this.rabbitMqFactoryService.createConsumer<CreatePayableDto>({
            retries: 3,
            interval: 1000,
            queueName: 'payables',
            consumerTag: 'payable-consumer',
            noAck: false,
            prefetchCount: 1,
            noLocal: false,
            exclusive: false,
            args: {},
            onConsumeError: (error) => this.logger.error('Consume Error:', error),
            onFailure: this.onExceededRetries.bind(this),
        });

        consumer.addPayableListener(this.onMessageReceived.bind(this));
    }

    private async onExceededRetries(payable: CreatePayableDto, err : Error) {
        this.logger.log("Ops.. tentou demais e não funcionou:", payable)
        this.producerBacklog.addToQueue([payable])

        await this.mailerService.sendMail({
            to: 'recipient@example.com',
            subject: 'New Payable Failed',
            template: 'payable-failed',
            context: { payable, reason: err.message },
        });  
    }

    private async onMessageReceived(payable: CreatePayableDto) {
        // Process the payable and send an email
        
        await this.payableService.create(payable);

        this.logger.log("enviando email:", payable)
        await this.mailerService.sendMail({
            to: 'recipient@example.com',
            subject: 'New Payable Created',
            template: 'payable-done', // e.g., 'payable-created'
            context: { },
        });  
    }
}
