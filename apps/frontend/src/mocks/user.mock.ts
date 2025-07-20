import { UserProfileSchema } from "@meal-prep/contracts";

export const mockedUser: UserProfileSchema = {
  id: "1234",
  name: "John Smith",
  email: "john@email.me.com",
  meal_count: 2,
  favourite_cuisine: "Spaghetti",
  dietary_preferences: ["low carb", "gluten free"],
  avatar_url: "",
};
