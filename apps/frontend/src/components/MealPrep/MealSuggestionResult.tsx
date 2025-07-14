import { Card } from "../ui/card";
import { type MealSuggestionResultProps } from "./types";

export const MealSuggestionResult = ({
  title,
  description,
  bullets,
}: MealSuggestionResultProps) => {
  return (
    <Card className="p-6 my-6 max-w-4xl mx-auto">
      <h4 className="text-2xl font-bold text-primary mb-2 ">{title}</h4>
      <p className="text-gray-700 mb-4  text-lg">{description}</p>
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
