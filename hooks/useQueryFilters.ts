import React from 'react';
import { Filters } from './useFilters';
import qs from 'qs';
import { useRouter } from 'next/navigation';


export const useQueryFIlters = (filters: Filters) => {

  const router = useRouter();

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
  }, [filters, router]);
  
};