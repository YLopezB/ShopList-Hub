
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { products, stores as initialStores } from "@/lib/data";
import { Package, DollarSign, Store as StoreIcon, Edit, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { StoreForm } from "@/components/store/store-form";
import type { Store } from "@/lib/types";

// This is a client component, so we can't use cookies().get() directly.
// For the purpose of this demo, we'll hardcode the ownerId.
const FAKE_OWNER_ID = "user-2";

export default function StoreDashboardPage() {
    const [stores, setStores] = useState(initialStores.filter(s => s.ownerId === FAKE_OWNER_ID));
    const myProducts = products.filter(p => stores.some(s => s.id === p.storeId));
    const [isStoreFormOpen, setIsStoreFormOpen] = useState(false);
    const [selectedStore, setSelectedStore] = useState<Store | null>(null);

    const totalRevenue = myProducts.reduce((acc, product) => acc + (product.price * (product.stock || 0)), 0);

    const handleAddStoreSuccess = (newStoreData: Omit<Store, 'id' | 'imageId' | 'headerImageId' | 'ownerId'>) => {
        const fullNewStore: Store = {
            ...newStoreData,
            id: `store-${Date.now()}`,
            ownerId: FAKE_OWNER_ID,
            imageId: `store-${Math.floor(Math.random() * 4) + 1}`,
            headerImageId: `store-header-${Math.floor(Math.random() * 4) + 1}`,
        };
        setStores(prev => [...prev, fullNewStore]);
    }

    const handleEditStoreSuccess = (updatedStore: Store) => {
        setStores(prev => prev.map(s => s.id === updatedStore.id ? updatedStore : s));
    }

    const handleAddClick = () => {
      setSelectedStore(null);
      setIsStoreFormOpen(true);
    }
    
    const handleEditClick = (store: Store) => {
        setSelectedStore(store);
        setIsStoreFormOpen(true);
    }
    
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold font-headline">Panel de Tienda</h1>
          <div className="flex gap-2">
              <Button onClick={handleAddClick}>
                <PlusCircle className="mr-2" />
                Agregar Tienda
              </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Productos Totales</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{myProducts.length}</div>
              <p className="text-xs text-muted-foreground">
                en {stores.length} tiendas
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tus Tiendas</CardTitle>
              <StoreIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stores.length}</div>
              <p className="text-xs text-muted-foreground">
                gestionadas por ti
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Total del Inventario</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPrice(totalRevenue)}</div>
              <p className="text-xs text-muted-foreground">
                Basado en el inventario y precios actuales
              </p>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 font-headline">Tus Tiendas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stores.map(store => (
                  <Card key={store.id}>
                      <CardHeader className="flex flex-row items-start justify-between">
                          <div>
                              <CardTitle className="font-headline">{store.name}</CardTitle>
                              <p className="text-sm text-muted-foreground">{store.location}</p>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => handleEditClick(store)}>
                              <Edit className="h-4 w-4" />
                          </Button>
                      </CardHeader>
                      <CardContent>
                          <p>Categoría: {store.category}</p>
                          <p>Productos: {products.filter(p => p.storeId === store.id).length}</p>
                      </CardContent>
                  </Card>
              ))}
              {stores.length === 0 && (
                  <p className="text-muted-foreground">Aún no eres dueño de ninguna tienda.</p>
              )}
          </div>
        </div>
      </div>
      <StoreForm 
        isOpen={isStoreFormOpen}
        setIsOpen={setIsStoreFormOpen}
        onAddSuccess={handleAddStoreSuccess}
        onEditSuccess={handleEditStoreSuccess}
        store={selectedStore}
      />
    </>
  );
}
