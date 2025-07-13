import { type MealSuggestionResultProps } from "./types";

export const MealSuggestionResult = ({
  title,
  description,
  bullets,
}: MealSuggestionResultProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl mx-auto mt-8 border border-gray-200">
      <h4 className="text-2xl font-bold text-primary mb-2 text-center">
        {title}
      </h4>
      <p className="text-gray-700 mb-4 text-center text-lg">{description}</p>
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
    </div>
  );
};
