import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';
import {
  recipeResponseSchema,
  recipeOpenAISchema,
  type RecipeResponseSchema,
} from '@meal-prep/contracts';

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async askQuestion(prompt: string): Promise<RecipeResponseSchema> {
    console.log('recipeResponseSchema', recipeResponseSchema);
    console.log('recipeOpenAISchema', recipeOpenAISchema);
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
          
          Remember to introduce additional ingredients only when necessary.
          You have to respect user's dietary preferences if set. Be strict if user has eg. vegetarian preferences and adds some of non-vegetarian ingredients. In this case add explicit "caution" comment before title content that recipe doesn't fit to dietary preferences criteria.`,
        },
        { role: 'user', content: prompt },
      ],
      text: {
        format: zodTextFormat(recipeResponseSchema, 'mealRecipe'),
      },
    });

    const mealRecipe = response;

    console.log('mealrecipe', mealRecipe);
    console.log('mealrecipe_instructions', mealRecipe.instructions);
    console.log('mealrecipe_parsed', mealRecipe.output_parsed);

    return (
      mealRecipe.output_parsed || {
        title: '',
        description: null,
        ingredients: null,
        bullets: [],
      }
    );
  }
}
