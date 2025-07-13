import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export const receipeResponseSchema = z.object({
  title: z.string(),
  description: z.array(z.string()).nullable(),
});

export const receipeOpenAISchema = zodToJsonSchema(
  receipeResponseSchema,
  "AnswerSchema"
);

console.log(JSON.stringify(receipeOpenAISchema, null, 2));
console.log(receipeOpenAISchema?.definitions?.AnswerSchema);

export type ReceipeResponseSchema = z.infer<typeof receipeResponseSchema>;
