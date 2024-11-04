"use client";

import React from "react";
import { Title } from "./title";
import { ProductCard } from "./product-card";
import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";

import { ProductWithRelations } from "@/@types/prisma";
import { useCategoryIntersection } from "@/hooks";

interface Props {
  title: string;
  items: ProductWithRelations[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const ProductGroupList: React.FC<Props> = ({
  title,
  items,
  listClassName,
  categoryId,
  className,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const { ref, isVisible } = useCategoryIntersection(categoryId);

  React.useEffect(() => {
    if (isVisible) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, isVisible, setActiveCategoryId]);
  
  return (
    <div className={cn( 'scroll-mt-[100px]',className)} id={categoryId.toString()} ref={ref}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {items.map((product, i) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  );
};
