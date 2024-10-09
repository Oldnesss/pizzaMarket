"use client";
import React, { PropsWithChildren } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui";
import Link from "next/link";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/lib";

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4f1EE]">
        <SheetHeader>
          <SheetTitle>
            В корзине <span className="font-bold">3 товара</span>
          </SheetTitle>
        </SheetHeader>
        <div className="-mx-6 mt-5 overflow-auto  flex-1">
          <div className="mb-2">
            <CartDrawerItem
              id={1}
              imageUrl={
                "https://media.dodostatic.net/image/r:292x292/11EEFB595A197C24BA932A0AD1144AFB.avif"
              }
              details={getCartItemDetails(2, 30, [
                { name: "Цыпа" },
                { name: "Сын" },
              ])}
              name={"Чоризо фреш"}
              price={419}
              quantity={1}
            />
          </div>
          <div className="mb-2">
            <CartDrawerItem
              id={1}
              imageUrl={
                "https://media.dodostatic.net/image/r:292x292/11EEFB595A197C24BA932A0AD1144AFB.avif"
              }
              details={getCartItemDetails(2, 30, [
                { name: "Цыпа" },
                { name: "Сын" },
              ])}
              name={"Чоризо фреш"}
              price={419}
              quantity={1}
            />
          </div>
          <div className="mb-2">
            <CartDrawerItem
              id={1}
              imageUrl={
                "https://media.dodostatic.net/image/r:292x292/11EEFB595A197C24BA932A0AD1144AFB.avif"
              }
              details={getCartItemDetails(2, 30, [
                { name: "Цыпа" },
                { name: "Сын" },
              ])}
              name={"Чоризо фреш"}
              price={419}
              quantity={1}
            />
          </div>
          <div className="mb-2">
            <CartDrawerItem
              id={1}
              imageUrl={
                "https://media.dodostatic.net/image/r:292x292/11EEFB595A197C24BA932A0AD1144AFB.avif"
              }
              details={getCartItemDetails(2, 30, [
                { name: "Цыпа" },
                { name: "Сын" },
              ])}
              name={"Чоризо фреш"}
              price={419}
              quantity={1}
            />
          </div>
          <div className="mb-2">
            <CartDrawerItem
              id={1}
              imageUrl={
                "https://media.dodostatic.net/image/r:292x292/11EEFB595A197C24BA932A0AD1144AFB.avif"
              }
              details={getCartItemDetails(2, 30, [
                { name: "Цыпа" },
                { name: "Сын" },
              ])}
              name={"Чоризо фреш"}
              price={419}
              quantity={1}
            />
          </div>
          <div className="mb-2">
            <CartDrawerItem
              id={1}
              imageUrl={
                "https://media.dodostatic.net/image/r:292x292/11EEFB595A197C24BA932A0AD1144AFB.avif"
              }
              details={getCartItemDetails(2, 30, [
                { name: "Цыпа" },
                { name: "Сын" },
              ])}
              name={"Чоризо фреш"}
              price={419}
              quantity={1}
            />
          </div>
        </div>
        

        {/* Items */}

        <SheetFooter className="-mx-6 bg-white pb-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Итого
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>
              <span className="font-bold text-lg">555 ₽</span>
            </div>

            <Link href="/cart">
              <Button type="submit" className="w-full h-12 text-base">
                Оформить заказ
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
