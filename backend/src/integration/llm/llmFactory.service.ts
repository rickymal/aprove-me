import { IChatSession } from './IChatSesssion';
import { ChatOpenAI } from '@langchain/openai';
import Handlebars from 'handlebars';
import { Injectable } from '@nestjs/common';

export type TemplatingObject = { [key: string]: string | TemplatingObject };

@Injectable()
export class OpenAI<TChatParams = TemplatingObject> {
  systemTemplate: string;
  openAI: ChatOpenAI;
  handleBars: HandlebarsTemplateDelegate<TChatParams>;
  questionTemplate: string;
  constructor(systemTemplate: string, questionTemplate: string) {
    this.systemTemplate = systemTemplate;
    this.questionTemplate = questionTemplate;

    this.openAI = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.7,
      modelName: 'gpt-4o-mini',
      // streaming: false,
      // maxTokens: 2000,
      // maxRetries: 1,
      // timeout: 10000,
      // maxConcurrency: 5,
      // maxResponseTokens: 2000,
    });

    // this.openAI = new OpenAI({
    //   modelName: 'gpt-4o-mini',
    //   temperature: 0.7,
    //   openAIApiKey: process.env.OPENAI_API_KEY,
    // });

    if (!(this.systemTemplate && this.questionTemplate)) {
      throw new Error('Prompt template is required');
    }

    this.handleBars = Handlebars.compile(this.systemTemplate);
  }

  async ask(message: TChatParams): Promise<string> {
    // in the future separate correctly the system and user request

    const messageConverted = this.handleBars.call(message);
    // Object.keys(message).forEach((key) => {
    //   promptTemplate = promptTemplate.replace(
    //     new RegExp(`{{${key}}}`, 'g'),
    //     message[key],
    //   );
    // });
    // this.logger.log({ promptTemplate });

    const promptTemplate = this.systemTemplate + this.questionTemplate + messageConverted;

    /**
     * @todo set the prompt in two parts 'system' and 'user'
     */
    const answer = await this.openAI.invoke(promptTemplate);

    // this.logger.log('model answer', { response });
    return answer.content.toString();
  }
}

export class LlmFactoryService {
  promptTemplate: string;
  openAI: ChatOpenAI;

  /**
   * Creates an instance of the OpenAI chat session with the provided system and question templates.
   * I neede refactored this code because I didn't respect tha YAGNI principle, before wasn't any but [key: string]: string because I though that before didn't have nested key
   * @param systemTemplate - The template for the system prompt.
   * @param questionTemplate - The template for the user's question.
   * @returns An instance of the `IChatSesssion` interface that can be used to ask questions.
   */
  createAgency<TChatParams = TemplatingObject>(systemTemplate: string, questionTemplate: string): IChatSession<TChatParams> {
    return new OpenAI<TChatParams>(systemTemplate, questionTemplate);
  }
}
