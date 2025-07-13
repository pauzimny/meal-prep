import * as React from "react";
import { type MealSuggestionResultProps } from "./types";

export const MealSuggestionResult = ({
  title,
  description,
  bullets,
}: MealSuggestionResultProps) => {
  return (
    <div>
      <h4>{title}</h4>
      <p>{description}</p>
      <ul>
        {bullets.map((bullet) => (
          <li key={`${bullet}-receipe`}>{bullet}</li>
        ))}
      </ul>
    </div>
  );
};
