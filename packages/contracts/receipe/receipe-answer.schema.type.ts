import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const receipeResponseSchema = z.object({
  title: z.string(),
  description: z.string(),
  bullets: z.array(z.string()),
});

const jsonSchema = zodToJsonSchema(receipeResponseSchema, "AnswerSchema");

console.log(JSON.stringify(jsonSchema, null, 2));
