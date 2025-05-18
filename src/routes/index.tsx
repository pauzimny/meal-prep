import { MealPrep } from "@/components/MealPrep/MealPrep";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <MealPrep />;
}
