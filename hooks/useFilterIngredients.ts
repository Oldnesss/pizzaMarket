import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import React from "react";

// type IngredientItem = Pick<Ingredient, "id" | "name">;
interface ReturnProps {
  ingredients: Ingredient[];
}

export const useFilterIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  React.useEffect(() => {
    async function fetchIngredients() {
      try {
        const ingredients = await Api.ingredients.getAll();
        setIngredients(ingredients);
      } catch (err) {
        console.log(err);
      }
    }
    fetchIngredients();
  }, []);
  return { ingredients };
};
