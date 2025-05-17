import { useCallback, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { QuantitySelector } from "../QuantitySelector";

interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

interface MealSuggestion {
  title: string;
  type: string;
  ingredients: string[];
  recipe: string;
}

export function MealPrep() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [newIngredient, setNewIngredient] = useState<Ingredient>({
    name: "",
    quantity: 0,
    unit: "g",
  });
  const [mealType, setMealType] = useState<string>("");
  const [suggestions] = useState<MealSuggestion[]>([]);

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
    // TODO: Implement meal suggestion logic
    // This is where we'll add the API call to get meal suggestions
    console.log("Ingredients:", ingredients);
    console.log("Meal Type:", mealType);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Meal Prep Assistant
        </h1>

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
            <Button
              onClick={handleAddIngredient}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Add
            </Button>
          </div>

          {/* Ingredients List */}
          <div className="mt-4">
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 bg-gray-50 rounded mb-2"
              >
                <span>
                  {ingredient.name} - {ingredient.quantity} {ingredient.unit}
                </span>
                <Button
                  variant="ghost"
                  onClick={() =>
                    setIngredients(ingredients.filter((_, i) => i !== index))
                  }
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
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
                className={mealType === type ? "bg-blue-500 text-white" : ""}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={ingredients.length === 0 || !mealType}
          className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Get Meal Suggestions
        </Button>

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
    </div>
  );
}
