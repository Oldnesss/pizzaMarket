'use client'

import React, { useEffect } from "react";
import { Container } from "./container";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { User } from "lucide-react";
import { SearchInput } from "./search-input";
import Link from "next/link";
import { CartButton } from "./cart-button";

import { useRouter } from "next/router";
import { useSearchParams } from 'next/navigation'
import toast from "react-hot-toast";


interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({
  hasSearch = true,
  hasCart = true,
  className,
}) => {



 const searchParams = useSearchParams()

  useEffect(() => {
    let toastMessage = '';
    if(searchParams.has('paid')){
      toastMessage = 'Заказ успешно оплачен! Инфо по заказу отправлена на почту.'
    }
    
    if(searchParams.has('verified')){
      toastMessage = 'Почта успешно подтверждена!'
    }

    if(toastMessage) {
      setTimeout(() => {
        router.replace('/');
        toast.success(toastMessage, {
          duration: 3000,
        })
      }, 1000)
    }
    


  },[])

  return (
    <header className={cn(" border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Левая часть*/}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.svg" alt="Logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                вкусней уже некуда
              </p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* Правая часть*/}

        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-1">
            <User size={16} />
            Войти
          </Button>

          { hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
