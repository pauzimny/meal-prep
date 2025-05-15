import { useState } from "react";

interface Ingredient {
  name: string;
  quantity: string;
}

interface MealSuggestion {
  title: string;
  type: string;
  ingredients: string[];
  recipe: string;
}

export function MealPrep() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    quantity: "",
  });
  const [mealType, setMealType] = useState<string>("");
  const [suggestions, setSuggestions] = useState<MealSuggestion[]>([]);

  const handleAddIngredient = () => {
    if (newIngredient.name && newIngredient.quantity) {
      setIngredients([...ingredients, newIngredient]);
      setNewIngredient({ name: "", quantity: "" });
    }
  };

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
          <h2 className="text-xl font-semibold mb-4">Available Ingredients</h2>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Ingredient name"
              className="flex-1 p-2 border rounded"
              value={newIngredient.name}
              onChange={(e) =>
                setNewIngredient({ ...newIngredient, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Quantity"
              className="flex-1 p-2 border rounded"
              value={newIngredient.quantity}
              onChange={(e) =>
                setNewIngredient({ ...newIngredient, quantity: e.target.value })
              }
            />
            <button
              onClick={handleAddIngredient}
              className="!bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>

          {/* Ingredients List */}
          <div className="mt-4">
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 bg-gray-50 rounded mb-2"
              >
                <span>
                  {ingredient.name} - {ingredient.quantity}
                </span>
                <button
                  onClick={() =>
                    setIngredients(ingredients.filter((_, i) => i !== index))
                  }
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Meal Type Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Select Meal Type</h2>
          <div className="flex gap-4">
            {["Breakfast", "Lunch", "Dinner"].map((type) => (
              <button
                key={type}
                onClick={() => setMealType(type)}
                className={`px-4 py-2 rounded ${
                  mealType === type
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={ingredients.length === 0 || !mealType}
          className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Get Meal Suggestions
        </button>

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
