export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface MealSuggestion {
  title: string;
  type: string;
  ingredients: string[];
  recipe: string;
}

export interface MealSuggestionResultProps {
  title: string;
  description: string;
  bullets: string[];
}
