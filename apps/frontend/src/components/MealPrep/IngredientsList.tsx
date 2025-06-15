import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import type { Ingredient } from "./MealPrep";

interface IngredientsListProps {
  ingredients: Ingredient[];
  updateIngredients: (newIngredientsList: Ingredient[]) => void;
}

export function IngredientsList({
  ingredients,
  updateIngredients,
}: IngredientsListProps) {
  return (
    <div className="mt-4 ">
      {ingredients.map((ingredient, index) => (
        <div
          key={index}
          className="flex justify-between items-center py-2 px-4 bg-accent rounded-md mb-2"
        >
          <span className="text-sm">
            {ingredient.name} - {ingredient.quantity} {ingredient.unit}
          </span>
          <Button
            variant="outline"
            onClick={() =>
              updateIngredients(ingredients.filter((_, i) => i !== index))
            }
            className="text-destructive hover:text-red-700 hover:border-red-700 border-destructive hover:bg-red-50"
          >
            <Trash />
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
}
