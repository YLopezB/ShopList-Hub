

"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Product } from "@/lib/types";
import { useEffect, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useToast } from "@/hooks/use-toast";
import StoresPage, { addProductAction, updateProductAction } from "@/lib/actions";
import { Loader2 } from "lucide-react";
import { stores as allStores } from "@/lib/data";


interface ProductFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  product: Product | null;
}

const initialState = {
    message: "",
}

const OWNER_ID = await StoresPage()
const myStores = allStores.filter(s => s.ownerId === OWNER_ID);

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Guardar cambios
        </Button>
    )
}

export function ProductForm({
  isOpen,
  setIsOpen,
  product,
}: ProductFormProps) {
    const { toast } = useToast();
    const actionToUse = product ? updateProductAction.bind(null, product._id) : addProductAction;
    const [state, formAction] = useActionState(actionToUse, initialState);

useEffect(() => {
    if (state?.message === "success") {
        toast({
            title: `Producto ${product ? 'Actualizado' : 'Agregado'}`,
            description: `El producto ha sido ${product ? 'actualizado' : 'agregado'} exitosamente.`
        });

        setIsOpen(false);
        window.location.reload();
    } else if (state?.message) {
        toast({
            variant: "destructive",
            title: `Error al ${product ? 'actualizar' : 'agregar'} el producto`,
            description: state.message,
        });
    }
}, [state, product, setIsOpen, toast]);


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>{product ? "Editar Producto" : "Agregar Producto"}</DialogTitle>
            <DialogDescription>
              {product
                ? "Actualiza los detalles de tu producto."
                : "Agrega un nuevo producto a una de tus tiendas."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="storeId" className="text-right">
                Tienda
              </Label>
              <Select name="storeId" defaultValue={product?.storeId} required>
                  <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecciona una tienda" />
                  </SelectTrigger>
                  <SelectContent>
                      {myStores.map(store => (
                          <SelectItem key={store._id} value={store._id}>
                              {store.name}
                          </SelectItem>
                      ))}
                  </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={product?.name}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descripción
              </Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={product?.description}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Precio
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="1"
                defaultValue={product?.price}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imageId" className="text-right">
                    URL de Imagen
                </Label>
                <Input
                    id="imageId"
                    name="imageId"
                    defaultValue={product?.imageId}
                    className="col-span-3"
                    placeholder="https://example.com/imagen.jpg"
                    required
                />
            </div>
          </div>
          <DialogFooter>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
