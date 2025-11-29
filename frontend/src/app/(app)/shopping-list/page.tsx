"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useShoppingList } from "@/hooks/use-shopping-list";
import { Trash2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ShoppingListPage() {
  const { items, removeItem, updateQuantity, clearList, totalItems, totalPrice } = useShoppingList();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold mb-6 font-headline">Tu Lista de Compras</h1>

        {items.length === 0 ? (
          <Card className="text-center py-20">
            <CardHeader>
                <div className="flex justify-center mb-4">
                    <ShoppingCart className="h-16 w-16 text-muted-foreground" />
                </div>
              <CardTitle className="font-headline text-2xl">Tu lista está vacía</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Parece que aún no has agregado ningún artículo.
              </p>
              <Button asChild>
                <Link href="/dashboard">Explorar Tiendas</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
                <ul className="divide-y">
                {items.map(({ product, quantity }) => {
                    return (
                    <li key={product.id} className="p-4 flex items-center justify-between space-x-4">
                        <div className="flex items-center gap-4 flex-1">
                        {product.imageId && (
                            <Image
                                src={product.imageId}
                                alt={product.name}
                                width={64}
                                height={64}
                                className="rounded-md object-cover"
                            />
                        )}
                        <div className="flex-1">
                            <p className="font-semibold">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{formatPrice(product.price)} cada uno</p>
                        </div>
                        </div>
                        <div className="flex items-center gap-4">
                        <Input
                            type="number"
                            value={quantity}
                            onChange={(e) => {
                                const newQuantity = parseInt(e.target.value, 10);
                                updateQuantity(product.id, isNaN(newQuantity) ? 0 : newQuantity);
                            }}
                            className="w-20 h-9"
                            min="1"
                        />
                        <Button variant="ghost" size="icon" onClick={() => removeItem(product.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                            <span className="sr-only">Eliminar artículo</span>
                        </Button>
                        </div>
                    </li>
                    );
                })}
                </ul>
            </CardContent>
            <CardFooter className="justify-end p-4">
                <Button variant="outline" onClick={clearList}>
                    Limpiar Lista
                </Button>
            </CardFooter>
          </Card>
        )}
      </div>

      {items.length > 0 && (
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline">Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Artículos Totales</span>
                <span className="font-semibold">{totalItems}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total Estimado</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled>Proceder al Pago (Deshabilitado)</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
