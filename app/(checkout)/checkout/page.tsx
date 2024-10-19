"use client";

import { Container, Title, WhiteBlock } from "@/components/shared";
import {
  CheckoutItem,
  CheckoutItemDetails,
} from "@/components/shared/checkout";
import { Button, Input, Textarea } from "@/components/ui";
import { PizzaSize, PizzaType } from "@/constant/pizza";
import { useCart } from "@/hooks";
import { getCartItemDetails } from "@/lib";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";

export default function CheckoutPage() {
  const { totalAmount, updateItemQuantity, items, removeCartItem } = useCart();

  function onClickCountButton(
    id: number,
    quantity: number,
    type: string
  ): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Container className="mt-10">
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />

      <div className="flex gap-40">
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <WhiteBlock title="1.Корзина">
            <div className="flex flex-col gap-5 ">
              {items.map((item) => (
                <CheckoutItem
                  key={item.id}
                  id={item.id}
                  imageUrl={item.imageUrl}
                  details={
                    item.pizzaSize && item.pizzaType
                      ? getCartItemDetails(
                          item.ingredients,
                          item.pizzaType as PizzaType,
                          item.pizzaSize as PizzaSize
                        )
                      : ""
                  }
                  disabled={item.disabled}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  onClickCountButton={(type) =>
                    onClickCountButton(item.id, item.quantity, type)
                  }
                  onClickRemove={() => removeCartItem(item.id)}
                />
              ))}
            </div>
          </WhiteBlock>

          <WhiteBlock title="2.Персональные данные">
            <div className="grid grid-cols-2 gap-5">
              <Input name="firstName" className="text-base" placeholder="Имя" />
              <Input
                name="lastName"
                className="text-base"
                placeholder="Фамилия"
              />
              <Input name="email" className="text-base" placeholder="E-Mail" />
              <Input name="phone" className="text-base" placeholder="Телефон" />
            </div>
          </WhiteBlock>

          <WhiteBlock title="3.Адрес доставки">
            <div className="flex flex-col gap-5">
              <Input name="phone" className="text-base" placeholder="Адрес" />
              <Textarea
                className="text-base"
                placeholder="Комментарий к заказу"
                rows={5}
              />
            </div>
          </WhiteBlock>
        </div>

        {/* Правая часть */}

        <div className="w-[450px]">
          <WhiteBlock className="p-6 sticky top-4">
            <div className="flex flex-col gap-1">
              <span className="text-xl">Итого:</span>
              <span className="text-4xl font-extrabold">{totalAmount} P</span>
            </div>
            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Package size={20} className="mr-2 text-gray-300" />
                  Стоимость товаров:
                </div>
              }
              value="3000 P"
            />
            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Percent size={20} className="mr-2 text-gray-300" />
                  Налоги:
                </div>
              }
              value="3000 P"
            />
            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Truck size={20} className="mr-2 text-gray-300" />
                  Доставка:
                </div>
              }
              value="3000 P"
            />

            <Button
              type="submit"
              className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
            >
              Перейти к оплате
              <ArrowRight className="w-5 ml-2" />
            </Button>
          </WhiteBlock>
        </div>
      </div>
    </Container>
  );
}
