import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';
import {
  receipeResponseSchema,
  receipeOpenAISchema,
  type ReceipeResponseSchema,
} from '@meal-prep/contracts';

// const receipeOpenAIRequestTools: OpenAI.Chat.Completions.ChatCompletionTool[] =
//   [
//     {
//       type: 'function',
//       function: {
//         name: 'get_receipe',
//         description: 'Return receipe',
//         parameters: receipeOpenAISchema as Record<string, any>,
//       },
//     },
//   ];

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
          content: 'You are a chef. Provide receipe.',
        },
        { role: 'user', content: prompt },
      ],
      text: {
        format: zodTextFormat(receipeResponseSchema, 'mealReceipe'),
      },
    });

    const mealReceipe = response;
    console.log('mealreceipe', mealReceipe.output_parsed);

    // const response = await this.openai.chat.completions.create({
    //   model: 'gpt-4o-mini',
    //   messages: [{ role: 'user', content: prompt }],
    //   tools: receipeOpenAIRequestTools,
    //   tool_choice: {
    //     type: 'function',
    //     function: { name: 'get_receipe' },
    //   },
    // });

    // console.log('response', response.choices[0]?.message);
    // console.dir(response, { depth: null });

    // const toolCall = response.choices[0]?.message?.tool_calls?.[0];
    // const args = toolCall?.function?.arguments
    //   ? JSON.parse(toolCall?.function?.arguments)
    //   : undefined;

    // console.log('args', args);

    // return args || 'No response from OpenAI';
    return mealReceipe.output_parsed || { title: '', description: null };
  }
}
