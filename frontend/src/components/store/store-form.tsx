
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
import { useEffect, useActionState, useRef } from "react";
import { useFormStatus } from "react-dom";
import { useToast } from "@/hooks/use-toast";
import { addStoreAction, updateStoreAction } from "@/lib/actions";
import { Loader2 } from "lucide-react";
import type { Store } from "@/lib/types";

interface StoreFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onAddSuccess: (newStore: Omit<Store, 'id' | 'imageId' | 'headerImageId' | 'ownerId'>) => void;
  onEditSuccess: (updatedStore: Store) => void;
  store: Store | null;
}

const initialState: { message: string, store?: any, error?: boolean, timestamp?: number } = {
    message: "",
};


function SubmitButton({ isEditing }: { isEditing: boolean }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? "Guardar Cambios" : "Crear Tienda"}
        </Button>
    )
}

export function StoreForm({
  isOpen,
  setIsOpen,
  onAddSuccess,
  onEditSuccess,
  store
}: StoreFormProps) {
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const lastStateTimestamp = useRef<number | undefined>(undefined);
    
    const isEditing = !!store;
    const actionToUse = isEditing ? updateStoreAction.bind(null, store!._id) : addStoreAction;
    const [state, formAction] = useActionState(actionToUse, initialState);

    useEffect(() => {
        if (!state || !state.message || state.timestamp === lastStateTimestamp.current) {
          return;
        }

        lastStateTimestamp.current = state.timestamp;
    
        if (state.message === "success" && state.store) {
            toast({
                title: `Tienda ${isEditing ? 'Actualizada' : 'Creada'}`,
                description: `La tienda "${state.store.name}" ha sido ${isEditing ? 'actualizada' : 'creada'} exitosamente.`
            });
            if (isEditing) {
                onEditSuccess(state.store);
            } else {
                onAddSuccess(state.store);
            }
            setIsOpen(false);
            formRef.current?.reset();
        } else if (state.error) {
             toast({
                variant: "destructive",
                title: `Error al ${isEditing ? 'actualizar' : 'crear'} la tienda`,
                description: state.message,
            });
        }
    }, [state, isEditing, onAddSuccess, onEditSuccess, setIsOpen, toast]);


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <form action={formAction} ref={formRef}>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Editar Tienda" : "Agregar Nueva Tienda"}</DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Actualiza los detalles de tu tienda."
                : "Completa los detalles para registrar una nueva tienda."
              }
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={store?.name}
                placeholder="Mi Tienda Fantástica"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Categoría
              </Label>
              <Input
                id="category"
                name="category"
                defaultValue={store?.category}
                placeholder="Ej: Abarrotes, Ropa"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Ubicación
              </Label>
              <Input
                id="location"
                name="location"
                defaultValue={store?.location}
                placeholder="123 Calle Falsa, Ciudad"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imagenURL" className="text-right">
                Imagen URL
              </Label>
              <Input
                id="imagenURL"
                name="imagenURL"
                defaultValue={store?.imagenURL}
                placeholder="https://myimage.jpg"
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <SubmitButton isEditing={isEditing} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
