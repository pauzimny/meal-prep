import { Button } from "../ui/button";

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
      <h2 className="text-xl font-semibold mb-4">Select Meal Type</h2>
      <div className="flex gap-4 pb-6">
        {["Breakfast", "Lunch", "Dinner"].map((type) => (
          <Button
            key={type}
            onClick={() => selectMealType(type)}
            variant={mealType === type ? "default" : "outline"}
            className={mealType === type ? "bg-blue-500 text-white" : ""}
          >
            {type}
          </Button>
        ))}
      </div>
    </>
  );
}
