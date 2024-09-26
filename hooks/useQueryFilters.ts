import React from 'react';
import { QueryFilters } from './useFilters';

export const useQueryFIlters = (filters: QueryFilters) => {

  React.useEffect(() => {
    const params = {
      ...filters.prices,
      pizzaTypes: Array.from(filters.pizzaTypes),
      sizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngredients),
    };
    // console.log({ prices, pizzaTypes, sizes, selectedIngredients });

    const query = qs.stringify(params, {
      arrayFormat: "comma",
    });

    router.push(`?${query}`, {
      scroll: false,
    });
  }, []);
  
};