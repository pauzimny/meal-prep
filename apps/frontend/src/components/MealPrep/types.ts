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
