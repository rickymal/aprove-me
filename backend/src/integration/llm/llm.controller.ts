import { Controller, Get, Param } from '@nestjs/common';
import { readFileSync } from 'fs';

import * as path from 'path';
import { LlmFactoryService } from './llmFactory.service';

type TemplateData = {
  question: string;
  correctAnswers: {
    correctAnswer: string;
  }[];
  wrongAnswers: {
    correctAnswe: string;
  }[];
};

@Controller('llm')
export class llmController {
  agent: any;

  constructor(private readonly llmService: LlmFactoryService) {
    if (!process.env.PROMPT_PATH) {
      throw new Error('PROMPT_PATH is required');
    }

    const systemTemplate = readFileSync(path.join(process.env.PROMPT_PATH, 'prompt-system.hbs')).toString();
    const questionTemplate = readFileSync(path.join(process.env.PROMPT_PATH, 'question-template.hbs')).toString();

    this.agent = llmService.createAgency<TemplateData>(systemTemplate, questionTemplate);
  }

  // curl http://localhost:3000/llm/what%20is%20the%20weather%20today
  @Get()
  askSomething(@Param('question') question: string) {
    return this.agent.ask(question);
  }
}
