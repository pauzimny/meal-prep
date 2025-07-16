import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export const recipeResponseSchema = z.object({
  title: z.string(),
  bullets: z.array(z.string()),
  description: z.array(z.string()).nullable(),
  ingredients: z.array(z.string()).nullable(),
});

export const recipeOpenAISchema = zodToJsonSchema(
  recipeResponseSchema,
  "AnswerSchema"
);

console.log(
  "JSON.stringify(recipeOpenAISchema, null, 2)",
  JSON.stringify(recipeOpenAISchema, null, 2)
);
console.log(
  "recipeOpenAISchema?.definitions?.AnswerSchema",
  recipeOpenAISchema?.definitions?.AnswerSchema
);

export type RecipeResponseSchema = z.infer<typeof recipeResponseSchema>;
