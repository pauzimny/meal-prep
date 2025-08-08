import { Link } from "@tanstack/react-router";
import * as Accordion from "@radix-ui/react-accordion";
import { useUserStore } from "../../stores/userStore";
import { MealSuggestionResult } from "../MealSuggestionResult/MealSuggestionResult";
import { useState } from "react";
import { IconButton } from "../ui/icon-button";
import { Trash } from "lucide-react";
import RemoveMealDialog from "./RemoveMealDialog";
import { RecipeResponseSchema } from "@meal-prep/contracts";
import { useUpdateUserSavedMealsListMutation } from "@/query-hooks/user/useUserProfile";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export function SavedMeals() {
  const userProfile = useUserStore((state) => state.user);

  const [openItems, setOpenItems] = useState<string[]>([]);
  const [openRemoveMealDialog, setOpenRemoveMealDialog] = useState(false);
  const [mealToRemove, setMealToRemove] = useState<RecipeResponseSchema | null>(
    null
  );
  const queryClient = useQueryClient();

  const mealsList = userProfile?.saved_meals;

  const { mutate } = useUpdateUserSavedMealsListMutation({
    onSuccess: () => {
      toast.success("Meal removed successfully");
      queryClient.invalidateQueries({
        queryKey: ["user-profile", userProfile?.id],
      });
    },
    onError: () => {
      toast.error("Error removing meal");
    },
  });

  const handleHeaderClick = (value: string) => {
    setOpenItems((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleRemoveMealClick = (
    e: React.MouseEvent,
    meal: RecipeResponseSchema
  ) => {
    e.stopPropagation();
    setMealToRemove(meal);
    setOpenRemoveMealDialog(true);
  };

  const confirmRemoveMeal = () => {
    if (!userProfile?.id || !mealToRemove) return;
    mutate({
      userId: userProfile.id,
      mealData: mealToRemove,
    });
    setOpenRemoveMealDialog(false);
    setMealToRemove(null);
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
    <>
      <Accordion.Root
        type="multiple"
        value={openItems}
        onValueChange={setOpenItems}
        className="w-full"
      >
        {mealsList.map((meal) => {
          const value = meal.id + meal.title;
          return (
            <Accordion.Item
              value={value}
              key={value}
              className="border rounded my-2"
            >
              <Accordion.Header
                className="cursor-pointer flex justify-between items-center pr-4 py-2 bg-white transition hover:bg-primary/10"
                onClick={() => handleHeaderClick(value)}
              >
                <Accordion.Trigger
                  className="w-full text-left text-primary px-4 py-2 font-semibold "
                  onClick={(e) => e.preventDefault()}
                >
                  {meal.title}
                </Accordion.Trigger>
                <IconButton
                  variant="outline"
                  size="sm"
                  className="border-red-700 hover:bg-red-200"
                  onClick={(e) => handleRemoveMealClick(e, meal)}
                >
                  <Trash className="h-4 w-4 text-red-700" />
                </IconButton>
              </Accordion.Header>
              <Accordion.Content className="p-4">
                <MealSuggestionResult {...meal} />
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
      <RemoveMealDialog
        open={openRemoveMealDialog}
        setOpen={setOpenRemoveMealDialog}
        mealTitle={mealToRemove?.title || ""}
        onRemove={confirmRemoveMeal}
      />
    </>
  );
}
