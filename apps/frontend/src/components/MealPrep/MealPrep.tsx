import * as React from "react";
import { useCallback, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { QuantitySelector } from "../QuantitySelector";
import { IngredientsList } from "./IngredientsList";
import { useGenerateReceipe } from "../../query-hooks/receipe";
import { type Ingredient, type MealSuggestion } from "./types";
import { generatePrompt } from "./helpers";
import { MealSuggestionResult } from "./MealSuggestionResult";

export function MealPrep() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [newIngredient, setNewIngredient] = useState<Ingredient>({
    name: "",
    quantity: 0,
    unit: "g",
  });
  const [mealType, setMealType] = useState<string>("");
  const [suggestions] = useState<MealSuggestion[]>([]);

  const { mutate, error, isPending, data } = useGenerateReceipe();

  console.log("meal suggestions:", data);

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

  const handleSubmit = () => {
    console.log("Ingredients:", ingredients);
    console.log("Meal Type:", mealType);

    const prompt = generatePrompt(ingredients, mealType);
    mutate(prompt);
  };

  return (
    <div className="min-h-screen py-8 px-4 ">
      <div className="max-w-4xl mx-auto">
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

        {/* Meal Type Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Select Meal Type</h2>
          <div className="flex gap-4">
            {["Breakfast", "Lunch", "Dinner"].map((type) => (
              <Button
                key={type}
                onClick={() => setMealType(type)}
                variant={mealType === type ? "default" : "secondary"}
                className={mealType === type ? "bg-primary text-white" : ""}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={ingredients.length === 0 || !mealType || isPending}
        >
          Get Meal Suggestions
        </Button>

        {!!error && <div className="text-red-700 mt-2">{error.message}</div>}

        {/* Results Section */}
        {suggestions.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Suggested Meals</h2>
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 mb-4"
              >
                <h3 className="text-xl font-semibold mb-2">
                  {suggestion.title}
                </h3>
                <p className="text-gray-600 mb-4">Type: {suggestion.type}</p>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Ingredients:</h4>
                  <ul className="list-disc list-inside">
                    {suggestion.ingredients.map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Recipe:</h4>
                  <p className="text-gray-700">{suggestion.recipe}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {data && <MealSuggestionResult {...data} />}
    </div>
  );
}
