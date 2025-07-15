export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface MealSuggestionResultProps {
  title: string;
  description: string;
  bullets: string[];
  ingredients: string[];
}
