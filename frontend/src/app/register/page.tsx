"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/lib/actions";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";


const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Crear Cuenta
    </Button>
  )
}

function RegisterForm() {
  const [state, formAction] = useActionState(registerUser, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message) {
      toast({
        variant: "destructive",
        title: "Error de Registro",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <form action={formAction}>
      {state?.message && !toast && (
        <Alert variant="destructive" className="mb-4 mx-6">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error de Registro</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre Completo</Label>
          <Input id="name" name="name" placeholder="John Doe" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        <div className="space-y-2">
          <Label>Rol</Label>
          <RadioGroup
            name="role"
            defaultValue="customer"
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="customer" id="role-customer" />
              <Label htmlFor="role-customer">Cliente</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="store" id="role-store" />
              <Label htmlFor="role-store">Dueño de Tienda</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <SubmitButton />
      </CardFooter>
    </form>
  );
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-primary/5 p-4">
      <div className="absolute top-4 left-4">
        <Button variant="ghost" asChild>
          <Link href="/login">&larr; Volver a Iniciar Sesión</Link>
        </Button>
      </div>
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <UserPlus className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline">
            Crear una Cuenta
          </CardTitle>
          <CardDescription>
            Únete a ShopList Hub para empezar a organizar tus compras.
          </CardDescription>
        </CardHeader>
        <RegisterForm />
        <CardFooter className="flex-col gap-2 border-t pt-6">
          <div className="text-center text-sm text-muted-foreground">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="underline text-primary">
              Inicia Sesión
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
