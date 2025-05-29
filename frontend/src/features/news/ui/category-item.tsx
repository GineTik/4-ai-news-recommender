"use client";

import { ROUTES } from "@/shared/constants/routes";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type CategoryItemProps = {
  label: string;
  name: string;
};

export const CategoryItem = ({ label, name }: CategoryItemProps) => {
  const params = useParams<{ category: string }>();
  const category = params.category;
  const [isSelected, setIsSelected] = useState(category === name);

  useEffect(() => {
    setIsSelected(category === name);
  }, [category, name]);

  return (
    <Link
      href={ROUTES.NEWS(name)}
      className={cn(
        "bg-neutral px-3 py-2 rounded-full text-sm transition-colors cursor-pointer",
        isSelected &&
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        !isSelected && "hover:bg-secondary/20"
      )}
      onClick={() => {
        setIsSelected(true);
      }}
    >
      {label}
    </Link>
  );
};
