"use client";

import React from "react";
import { useCartStore } from "@/store";
import toast from "react-hot-toast";
import { ProductWithRelations } from "@/@types/prisma";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;

}

export const ProductForm: React.FC<Props> = ({ product, onSubmit: _onSubmit}) => {
  const [addCartItem, loading] = useCartStore((state) => [
    state.addCartItem,
    state.loading,
  ]);
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: itemId,
        ingredients,
      });

      toast.success(`${product.name} добавлен в корзину`);
      _onSubmit?.()
    } catch (error) {
      toast.error(`Не удалось добавить ${product.name} в корзину`);
      console.error(error);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        onSubmit={onSubmit}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      onSubmit={onSubmit}
      price={firstItem.price}
      loading={loading}
    />
  );
};
