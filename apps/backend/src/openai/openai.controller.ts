import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OpenAIService } from './openai.service';

@Controller('openai')
export class OpenAIController {
  constructor(private readonly openaiService: OpenAIService) {}

  @Post('ask')
  async ask(@Body('prompt') prompt: string) {
    if (!prompt || prompt.trim() === '') {
      throw new HttpException('Prompt is required', HttpStatus.BAD_REQUEST);
    }

    try {
      const result = await this.openaiService.askQuestion(prompt);
      if (!result) {
        throw new HttpException(
          'No valid response from OpenAI',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return result;
    } catch (error: unknown) {
      console.error('Error querying OpenAI:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new HttpException(
        `Error communicating with OpenAI: ${errorMessage}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
