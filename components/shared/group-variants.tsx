"use client";

import React from "react";
import { cn } from "@/lib/utils";

type Variant = {
  name: string;
  value: string;
  disabled?: boolean;
};

interface Props {
  className?: string;
  items: readonly Variant[];

  onClick?: (value: Variant["value"]) => void;
  value?: Variant["value"];
}

export const GroupVariants: React.FC<Props> = ({
  items,
  onClick,
  value,
  className,
}) => {
  return (
    <div
      className={cn(
        " flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none",
        className
      )}
    >
      {items.map((item) => (
        <button
          key={item.name}
          onClick={() => onClick?.(item.value)}
          className={cn(
            " flex justify-center items-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm ",
            {
              "bg-white shadow": item.value === value,
              "text-gray-500 opacity-50 pointer-events-none": item.disabled,
            }
          )}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};
