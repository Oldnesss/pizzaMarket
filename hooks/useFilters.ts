import { useRouter, useSearchParams } from "next/navigation";

import { useSet } from "react-use";
import React from "react";

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

export interface QueryFilters extends PriceProps {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
}

interface filters {
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceProps;
}
export const useFilters = () => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  // Фильтр ингредиентов
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get("ingredients")?.split(","))
  );

  // Фильтр размера
  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(
      searchParams.has("sizes") ? searchParams.get("sizes")?.split(",") : []
    )
  );

  // Фильтр типа пиццы
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(
      searchParams.has("pizzaTypes")
        ? searchParams.get("pizzaTypes")?.split(",")
        : []
    )
  );

  // Фильтр стоимости
  const [prices, setPrices] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices({
      ...prices,
      [name]: value,
    });
  };

  return {
    sizes,
    pizzaTypes,
    selectedIngredients,
    prices,
    setPrices: updatePrice,
    setPizzaTypes: togglePizzaTypes,
    setSizes: toggleSizes,
    setIngredients: toggleIngredients,
  };
};
