"use client";

import { Button } from "@/components/ui/button";
import { useShoppingList } from "@/hooks/use-shopping-list";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Plus } from "lucide-react";
import type { Product } from "@/lib/types";

export function StoreProducts({ products }: { products: Product[] }) {
  const { addItem } = useShoppingList();
  const { toast } = useToast();

  const handleAddItem = (product: Product) => {
    addItem(product);
    toast({
      title: "Artículo Agregado",
      description: `${product.name} ha sido agregado a tu lista de compras.`,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 font-headline">Productos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => {
            return (
              <div
                key={product.id}
                className="bg-card rounded-lg border shadow-sm flex flex-col overflow-hidden"
              >
                {product.imageId && (
                  <div className="relative w-full h-40">
                    <Image
                      src={product.imageId}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4 flex-grow flex flex-col">
                  <p className="font-semibold text-lg">{product.name}</p>
                  <p className="text-sm text-muted-foreground flex-grow mt-1">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-lg font-bold text-primary">
                      {formatPrice(product.price)}
                    </p>
                    <Button size="sm" onClick={() => handleAddItem(product)}>
                      <Plus className="mr-2 h-4 w-4" /> Agregar
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center text-muted-foreground py-10">
            No se encontraron productos para esta tienda.
          </div>
        )}
      </div>
    </div>
  );
}
