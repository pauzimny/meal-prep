import { Card } from "../ui/card";
import { type MealSuggestionResultProps } from "./types";

export const MealSuggestionResult = ({
  title,
  description,
  bullets,
  ingredients,
}: MealSuggestionResultProps) => {
  return (
    <Card className="p-6 my-6 max-w-4xl mx-auto">
      <h4 className="text-2xl font-bold text-primary mb-2 ">{title}</h4>
      <p className="text-gray-700 mb-4  text-lg">{description}</p>
      {ingredients && ingredients.length > 0 && (
        <div className="mb-4">
          <h5 className="font-semibold mb-2 text-primary">Ingredients:</h5>
          <ul className="list-disc list-inside space-y-1">
            {ingredients.map((ingredient) => (
              <li key={ingredient} className="ml-4 text-primary-dark">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      )}
      <ul className="list-disc list-inside space-y-2">
        {bullets.map((bullet) => (
          <li
            key={`${bullet}-receipe`}
            className="bg-primary/10 rounded px-3 py-2 text-primary-dark shadow-sm"
          >
            {bullet}
          </li>
        ))}
      </ul>
    </Card>
  );
};
