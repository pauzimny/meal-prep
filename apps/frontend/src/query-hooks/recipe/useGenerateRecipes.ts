import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { type RecipeResponseSchema } from "@meal-prep/contracts";

export const useGenerateRecipe = (): UseMutationResult<
  RecipeResponseSchema,
  Error,
  string
> => {
  return useMutation<RecipeResponseSchema, Error, string>({
    mutationFn: async (prompt: string): Promise<RecipeResponseSchema> => {
      // TODO: ENVS!
      const res = await fetch("http://localhost:3001/api/openai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error("Coś poszło nie tak");
      const data = (await res.json()) as RecipeResponseSchema;
      return data;
    },
  });
};
