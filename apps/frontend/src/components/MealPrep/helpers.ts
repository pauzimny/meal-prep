import { type Ingredient } from "./types";

export const formatIngredientsForPrompt = (
  ingredients: Ingredient[]
): string => {
  if (!ingredients.length) return "No ingredients provided!";

  const formatted = ingredients
    .map((ing) => `- ${ing.quantity} ${ing.unit} ${ing.name}`)
    .join("\n");

  return `\n${formatted}`;
};

export const generatePrompt = ({
  ingredients,
  mealType,
  dietaryPreferences = [],
}: {
  ingredients: Ingredient[];
  mealType: string;
  dietaryPreferences: string[];
}): string => {
  const baseText = `Generate meal suggestions for given ingredients: ${formatIngredientsForPrompt(
    ingredients
  )}. It should be ${mealType}.My dietary preferences are: ${dietaryPreferences.join(
    ","
  )}.The output should be returned according to given JSON schema: ingredients list, title, description and bullets (as recipe steps).`;

  return baseText;
};
