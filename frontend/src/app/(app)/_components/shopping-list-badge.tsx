"use client";

import { Badge } from "@/components/ui/badge";
import { useShoppingList } from "@/hooks/use-shopping-list";

export function ShoppingListBadge() {
  const { totalItems } = useShoppingList();

  if (totalItems === 0) {
    return null;
  }

  return <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">{totalItems}</Badge>;
}
