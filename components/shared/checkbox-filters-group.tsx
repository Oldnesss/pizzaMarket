"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { FilterCheckbox, FilterCheckboxProps } from "./filter-checkbox";
import { Input, Skeleton } from "../ui";

type Item = FilterCheckboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems: Item[];
  limit?: number;
  loading?: boolean;
  searchInputPlaceholder?: string;
  className?: string;
  onClickCheckbox?: (id: string) => void;
  defaultValue?: string[];
  selected?: Set<string>;
  name?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = "Поиск...",
  className,
  loading,
  onClickCheckbox,
  defaultValue,
  selected,
  name,
}) => {
  const [showAll, setShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>

        {...Array(limit)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="h-6 mb-4  rounded-[8px]" />
          ))}
        <Skeleton className="w-28 h-6 mb-4  rounded-[8px]" />
      </div>
    );
  }

  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLocaleLowerCase())
      )
    : (defaultItems || items).slice(0, limit);

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>

      {showAll && (
        <div className="mb-5">
          <Input
            onChange={onChangeSearchInput}
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
          />
        </div>
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item, index) => (
          <FilterCheckbox
            onCheckedChange={() => onClickCheckbox?.(item.value)}
            checked={selected?.has(item.value)}
            key={String(item.value)}
            value={item.value}
            text={item.text}
            endAdornment={item.endAdornment}
            name={name}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? "border-t-neutral-100 mt-4" : ""}>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-primary mt-3"
          >
            {showAll ? "Скрыть" : "+ Показать всё"}
          </button>
        </div>
      )}
    </div>
  );
};
