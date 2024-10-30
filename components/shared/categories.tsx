"use client";
import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";
import { Category } from "@prisma/client";
import React from "react";

interface Props {
  items: Category[];
  className?: string;
}

export const Categories: React.FC<Props> = ({ items, className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);

  const scrollToCategory = (id: number) => {
    document
      .getElementById(id.toString())
      ?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl ", className)}
    >
      {items.map(({ name, id }, index) => (
        <button
        onClick={() => scrollToCategory(id)}
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            categoryActiveId === id &&
              "bg-white shadow-md shadow-gray-200 text-primary"
          )}
          key={index}
        >
          {name}
        </button>
      ))}
    </div>
  );
};
