import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { QuantitySelector } from "../QuantitySelector";
import { IngredientsList } from "./IngredientsList";
import { useGenerateRecipe } from "../../query-hooks/recipe";
import { type Ingredient } from "./types";
import { generatePrompt } from "./helpers";
import { MealSuggestionResult } from "../MealSuggestionResult/MealSuggestionResult";
import { Loader } from "lucide-react";
import { SelectMealType } from "./SelectMealType";
import { useUserStore } from "../../stores/userStore";
import { useUpdateUserSavedMealsListMutation } from "../../query-hooks/user/useUserProfile";

const initialIngredient = {
  name: "",
  quantity: 0,
  unit: "g",
};

export function MealPrep() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [newIngredient, setNewIngredient] =
    useState<Ingredient>(initialIngredient);
  const [mealType, setMealType] = useState<string>("");
  const userProfile = useUserStore((state) => state.user);

  const setUserProfile = useUserStore((state) => state.setUser);

  const { mutate, error, isPending, data } = useGenerateRecipe();
  const { mutate: saveMeal } = useUpdateUserSavedMealsListMutation({
    onSuccess: () => {
      toast.success("Your meal has been saved!");
      setUserProfile({
        ...userProfile!,
        saved_meals: userProfile!.saved_meals.concat(data!),
      });
    },
    onError: () => {
      toast.error("Error saving meal");
    },
  });

  const handleSaveMeal = () => {
    if (!userProfile?.id || !data) return;

    saveMeal({
      userId: userProfile?.id,
      newMeal: data,
    });
  };

  const handleAddIngredient = () => {
    if (newIngredient.name && newIngredient.quantity > 0) {
      setIngredients([...ingredients, newIngredient]);
      setNewIngredient({ name: "", quantity: 0, unit: "g" });
    }
  };

  const changeQuantity = useCallback((newQuantity: number) => {
    setNewIngredient((prev) => ({ ...prev, quantity: newQuantity }));
  }, []);

  const changeUnit = useCallback((newUnit: string) => {
    setNewIngredient((prev) => ({ ...prev, unit: newUnit }));
  }, []);

  const changeMealType = useCallback((newMealType: string) => {
    setMealType(newMealType);
  }, []);

  const handleSubmit = () => {
    const prompt = generatePrompt({
      ingredients,
      mealType,
      dietaryPreferences: userProfile?.dietary_preferences || [],
    });
    mutate(prompt);
  };

  return (
    <div className="min-h-screen py-8 px-4 ">
      <div className="max-w-4xl mx-auto flex flex-col">
        {/* Ingredients Input Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Set your available Ingredients
          </h2>
          <div className="flex gap-4 mb-4">
            <Input
              type="text"
              placeholder="Ingredient name"
              className="flex-1"
              value={newIngredient.name}
              onChange={(e) =>
                setNewIngredient({ ...newIngredient, name: e.target.value })
              }
            />
            <div className="flex gap-2">
              <QuantitySelector
                quantity={newIngredient.quantity}
                unit={newIngredient.unit}
                onQuantityChange={changeQuantity}
                onUnitChange={changeUnit}
              />
            </div>
            <Button onClick={handleAddIngredient}>Add</Button>
          </div>

          <IngredientsList
            ingredients={ingredients}
            updateIngredients={setIngredients}
          />
        </div>
        <SelectMealType mealType={mealType} selectMealType={changeMealType} />

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={ingredients.length === 0 || !mealType || isPending}
          className="ml-auto w-[178px]"
        >
          {isPending ? (
            <Loader className="animate-spin w-6 h-6 text-white" />
          ) : (
            "Get Meal Suggestions"
          )}
        </Button>

        {!!error && <div className="text-red-700 mt-2">{error.message}</div>}
      </div>
      {data && <MealSuggestionResult {...data} onHeartClick={handleSaveMeal} />}
    </div>
  );
}
