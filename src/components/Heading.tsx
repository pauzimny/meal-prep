import mealHero from "../../public/meal-hero.png";

export function Heading() {
  return (
    <div className="relative w-full h-[84px]">
      <div className="absolute top-0 w-full h-full bg-black opacity-40 z-2" />
      <img src={mealHero} className="absolute top-0" />
      <h1 className="text-3xl font-bold text-center text-white absolute top-[30px] left-[130px] z-3">
        Meal Prep Assistant
      </h1>
    </div>
  );
}
