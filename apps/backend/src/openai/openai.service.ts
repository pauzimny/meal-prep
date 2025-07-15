import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';
import {
  receipeResponseSchema,
  receipeOpenAISchema,
  type ReceipeResponseSchema,
} from '@meal-prep/contracts';

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async askQuestion(prompt: string): Promise<ReceipeResponseSchema> {
    console.log('receipeResponseSchema', receipeResponseSchema);
    console.log('receipeOpenAISchema', receipeOpenAISchema);
    const response = await this.openai.responses.parse({
      model: 'gpt-4o-mini',
      input: [
        {
          role: 'system',
          content: `You are a chef. Provide a recipe STRICTLY as a JSON object with the following fields: 
          - title (string)
          - description (array of strings)
          - ingredients (array of strings)
          - bullets (array of strings)
          
          Example:
          {
            "title": "Spaghetti Carbonara",
            "description": ["A classic Italian pasta dish.", "Rich and creamy sauce."],
            "ingredients": ["spaghetti", "eggs", "parmesan cheese", "bacon"]
            "bullets":["Cook pasta according to package instructions; drain and set aside.", "In a large skillet, heat olive oil over medium-high heat."]
          }
          
          Remember to introduce additional ingredients only when necessary.`,
        },
        { role: 'user', content: prompt },
      ],
      text: {
        format: zodTextFormat(receipeResponseSchema, 'mealReceipe'),
      },
    });

    const mealReceipe = response;

    console.log('mealreceipe', mealReceipe);
    console.log('mealreceipe_instructions', mealReceipe.instructions);
    console.log('mealreceipe_parsed', mealReceipe.output_parsed);

    return (
      mealReceipe.output_parsed || {
        title: '',
        description: null,
        ingredients: null,
        bullets: [],
      }
    );
  }
}
