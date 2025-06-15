import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { OpenAIService } from './openai/openai.service';
import { OpenAIController } from './openai/openai.controller';
import { validateEnv } from './config/validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
  ],
  controllers: [AppController, OpenAIController],
  providers: [AppService, OpenAIService],
})
export class AppModule {}
