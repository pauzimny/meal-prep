import { Link } from "@tanstack/react-router";
import * as Accordion from "@radix-ui/react-accordion";
import { useUserStore } from "../../stores/userStore";
import { MealSuggestionResult } from "../MealSuggestionResult/MealSuggestionResult";
import { useState } from "react";

export function SavedMeals() {
  const userProfile = useUserStore((state) => state.user);

  const [openItems, setOpenItems] = useState<string[]>([]);

  const mealsList = userProfile?.saved_meals;

  const handleHeaderClick = (value: string) => {
    setOpenItems((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  if (!mealsList || mealsList.length === 0) {
    return (
      <div className="w-full text-center">
        No meals saved yet! Go to <Link to="/">meal prep</Link> and find your
        new recipes!
      </div>
    );
  }

  return (
    <Accordion.Root
      type="multiple"
      value={openItems}
      onValueChange={setOpenItems}
      className="w-full"
    >
      {mealsList.map((meal, idx) => {
        const value = meal.title + idx;
        return (
          <Accordion.Item
            value={value}
            key={value}
            className="border rounded my-2"
          >
            <Accordion.Header
              className="cursor-pointer"
              onClick={() => handleHeaderClick(value)}
            >
              <Accordion.Trigger
                className="w-full text-left text-primary px-4 py-2 font-semibold bg-white transition hover:bg-primary/10"
                onClick={(e) => e.preventDefault()}
              >
                {meal.title}
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="p-4">
              <MealSuggestionResult {...meal} />
            </Accordion.Content>
          </Accordion.Item>
        );
      })}
    </Accordion.Root>
  );
}
