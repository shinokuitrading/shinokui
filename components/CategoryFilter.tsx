"use client";

import { useId } from "react";
import { useRouter } from "next/navigation";

type CategoryFilterProps = {
  categories: string[];
  category: string;
  label: string;
  allLabel: string;
  labels?: Record<string, string>;
};

export function CategoryFilter({
  categories,
  category,
  label,
  allLabel,
  labels
}: CategoryFilterProps) {
  const router = useRouter();
  const selectId = useId();

  return (
    <div className="flex items-center gap-3 text-xs">
      <label className="text-textMuted" htmlFor={selectId}>
        {label}
      </label>
      <select
        id={selectId}
        name="category"
        className="rounded-full border border-oceanBrown/30 bg-ivory px-3 py-1"
        defaultValue={category}
        onChange={(e) => {
          const value = e.target.value;
          const url =
            value === "all"
              ? "/products"
              : `/products?category=${encodeURIComponent(value)}`;
          router.push(url);
        }}
      >
        <option value="all">{allLabel}</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {labels?.[cat] ?? cat}
          </option>
        ))}
      </select>
    </div>
  );
}
