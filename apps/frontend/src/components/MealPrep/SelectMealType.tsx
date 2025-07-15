import { Button } from "../ui/button";

const MEAL_LIST = ["Breakfast", "Lunch", "Dinner"];

interface SelectMealTypeProps {
  mealType: string; // todo: should be a type
  selectMealType: (mealType: string) => void;
}

export function SelectMealType({
  mealType,
  selectMealType,
}: SelectMealTypeProps) {
  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Select Meal Type</h2>
        <div className="flex gap-4">
          {MEAL_LIST.map((type) => (
            <Button
              key={type}
              onClick={() => selectMealType(type)}
              variant={mealType === type ? "default" : "secondary"}
              className={mealType === type ? "bg-primary text-white" : ""}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}
