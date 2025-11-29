"use client";

import type { ShoppingListItem, Product } from "@/lib/types";
import React, { createContext, useContext, useState, useMemo } from "react";

interface ShoppingListContextType {
  items: ShoppingListItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearList: () => void;
  totalItems: number;
  totalPrice: number;
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(
  undefined
);

export function ShoppingListProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<ShoppingListItem[]>([]);

  const addItem = (product: Product, quantity = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, quantity }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
    } else {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearList = () => {
    setItems([]);
  };

  const { totalItems, totalPrice } = useMemo(() => {
    return items.reduce(
      (totals, item) => {
        totals.totalItems += item.quantity;
        totals.totalPrice += item.product.price * item.quantity;
        return totals;
      },
      { totalItems: 0, totalPrice: 0 }
    );
  }, [items]);

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearList,
    totalItems,
    totalPrice,
  };

  return (
    <ShoppingListContext.Provider value={value}>
      {children}
    </ShoppingListContext.Provider>
  );
}

export function useShoppingList() {
  const context = useContext(ShoppingListContext);
  if (context === undefined) {
    throw new Error("useShoppingList must be used within a ShoppingListProvider");
  }
  return context;
}
