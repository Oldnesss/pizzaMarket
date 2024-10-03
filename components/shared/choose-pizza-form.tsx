'use client'

import React from "react";
import { cn } from "@/lib/utils";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { Button } from "../ui";
import { GroupVariants } from "./group-variants";
import { PizzaSize, PizzaType, pizzaTypes } from "@/constant/pizza";
import { IngredientItem } from "./ingredient-item";
import { Ingredient, ProductItem } from "@prisma/client";
import { getPizzaDetails } from "@/lib";
import { usePizzaOptions } from "@/hooks";

interface Props {
  className?: string;
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  onClickAddCard?: VoidFunction;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  onClickAddCard,
  className,
}) => {
  const {
    size,
    type,
    selectedIngredients,
    availableSizes,
    setSize,
    setType,
    addIngredient,
  } = usePizzaOptions(items);
  const { totalPrice, textDetails } = getPizzaDetails(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  );

  const handleClickAdd = () => {
    onClickAddCard = () => {
      onClickAddCard?.();
      console.log({
        size,
        type,
        ingredients: selectedIngredients,
      });
    };
  };

  return (
    <div className={cn(" flex flex-1", className)}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#dfdfdf] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetails}</p>
        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants
            items={availableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />
          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>
        <div className="mt-10 bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar ">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
