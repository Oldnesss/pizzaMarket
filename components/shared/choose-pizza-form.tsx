import React from "react";
import { cn } from "@/lib/utils";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { Button } from "../ui";

interface Props {
  className?: string;
  imageUrl: string;
  name: string;
  ingredients: any["ingredients"];
  items?: any["items"];
  onClickAdd?: VoidFunction;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  onClickAdd,
  className,
}) => {
  const textDetaills =
    "30 см, традиционное тесто, умом Россию не понять, оршином общим не измерить, у ней особенная стать в Россию можно только верить.";
  const totalPrice = "300";
  const size = '30'
  return (
    <div className={cn(" flex flex-1", className)}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#dfdfdf] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetaills}</p>
        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
