import { TemplatingObject } from './llmFactory.service';

export type IChatSession<TChatParams = TemplatingObject> = {
  ask(message: TChatParams): Promise<string>;
};
