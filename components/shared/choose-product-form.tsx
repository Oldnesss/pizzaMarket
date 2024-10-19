import React from "react";
import { cn } from "@/lib/utils";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { Button } from "../ui";

interface Props {
  className?: string;
  imageUrl: string;
  name: string;
  price: number;
  loading?: boolean;
  onSubmit?: VoidFunction;
}
/* (itemId: number, ingredients: number[]) => void */

export const ChooseProductForm: React.FC<Props> = ({
  name,
  imageUrl,
  onSubmit,
  price,
  loading,
  className,
}) => {
  return (
    <div className={cn(" flex flex-1", className)}>
      <div className=" flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className=" relative left-2 transition-all z-10 duration-300 w-[300px] h-[300px]"
        />
      </div>

      <div className="w-[490px] bg-[#dfdfdf] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <Button
          loading={loading}
          onClick={() => onSubmit?.()}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {price} ₽
        </Button>
      </div>
    </div>
  );
};
