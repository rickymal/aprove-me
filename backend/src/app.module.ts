import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { DatabaseModule } from './database/database.module';
import { IntegrationModule } from './integration/integration.module';
import { AuthModule } from './auth/auth.module';
import { OpenAI } from '@integration/llm/llmFactory.service';
import { llmController } from '@integration/llm/llm.controller';

@Module({
  imports: [IntegrationModule, AuthModule],
  controllers: [AppController, llmController],
  providers: [AppService, OpenAI],
})
export class AppModule {}
