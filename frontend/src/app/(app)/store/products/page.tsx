

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { products as initialProducts, stores } from "@/lib/data";
import { MoreHorizontal, PlusCircle, Trash2, Edit, Save } from "lucide-react";
import { ProductForm } from "@/components/store/product-form";
import type { Product } from "@/lib/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { deleteProductAction } from "@/lib/actions";
import { Input } from "@/components/ui/input";

const FAKE_OWNER_ID = "user-2";
const myStores = stores.filter(s => s.ownerId === FAKE_OWNER_ID);
const myStoreIds = myStores.map(s => s.id);

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts.filter(p => myStoreIds.includes(p.storeId)));
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = async () => {
    if (!selectedProduct) return;
    await deleteProductAction(selectedProduct.id);
    setProducts(products.filter((p) => p.id !== selectedProduct.id));
    toast({
        title: "Producto Eliminado",
        description: `"${selectedProduct.name}" ha sido eliminado exitosamente.`,
    })
    setIsDeleteDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleStockChange = (productId: string, newStock: number) => {
    setProducts(products.map(p => p.id === productId ? {...p, stock: newStock} : p));
  };
  
  const handleSaveStock = (productId: string) => {
      // Here you would typically call a server action to save the stock change
      const product = products.find(p => p.id === productId);
      console.log(`Saving stock for ${product?.name}: ${product?.stock}`);
      toast({
        title: "Inventario Actualizado",
        description: `El inventario para "${product?.name}" ha sido guardado.`,
      })
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
      <div className="flex items-center justify-between mb-6">
        <div>
            <h1 className="text-3xl font-bold font-headline">Tus Productos</h1>
            <p className="text-muted-foreground">Gestiona los listados de productos y el inventario de tu tienda.</p>
        </div>
        <Button onClick={handleAddProduct}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Agregar Producto
        </Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Imagen</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Tienda</TableHead>
                <TableHead className="text-right">Precio</TableHead>
                <TableHead className="w-[200px] text-center">Inventario</TableHead>
                <TableHead className="w-[50px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length > 0 ? products.map((product) => {
                const store = stores.find(s => s.id === product.storeId);
                return (
                <TableRow key={product.id}>
                  <TableCell>
                    {product.imageId && <Image src={product.imageId} alt={product.name} width={40} height={40} className="rounded-sm object-cover" />}
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{store?.name || 'N/A'}</TableCell>
                  <TableCell className="text-right">{formatPrice(product.price)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 justify-center">
                        <Input 
                            type="number"
                            className="w-20 h-9 text-center"
                            value={product.stock ?? 0}
                            onChange={(e) => handleStockChange(product.id, parseInt(e.target.value, 10) || 0)}
                            min="0"
                        />
                        <Button size="icon" variant="ghost" onClick={() => handleSaveStock(product.id)}>
                            <Save className="h-4 w-4" />
                        </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menú</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                          <Edit className="mr-2 h-4 w-4" /> Editar Detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDeleteClick(product)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )}) : (
                <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">No se encontraron productos.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ProductForm
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        product={selectedProduct}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente el
              producto "{selectedProduct?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
