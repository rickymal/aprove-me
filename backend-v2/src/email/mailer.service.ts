import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';

type ContextOptions = {
  total: number;
  success: number;
  failure: number;
};

type MailOption<T> = {
  to : string
  subject : string
  template : string
  context : T
}

@Injectable()
export class MailerService {
  constructor(private readonly mailerService: NestMailerService) {}

  async sendMail<T>(options: MailOption<T>) {
    return this.mailerService.sendMail(options);
  }
}
