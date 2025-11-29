"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { login } from "@/lib/actions";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";


const initialState = {
  message: "",
  success: false,
};

function SubmitButton({role}: {role: "customer" | "store"}) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Iniciar sesión como {role === 'customer' ? 'Cliente' : 'Dueño de Tienda'}
    </Button>
  )
}

function LoginForm({ role }: { role: "customer" | "store" }) {
  const [state, formAction] = useActionState(login, initialState);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      toast({
        title: "Inicio de Sesión Exitoso",
        description: "Bienvenido de nuevo.",
      });
      const destination = state.role === 'store' ? '/store/dashboard' : '/dashboard';
      router.push(destination);
      router.refresh(); // Forces a refresh to ensure layout gets user data
    } else if (state?.message) {
      toast({
        variant: "destructive",
        title: "Error de Inicio de Sesión",
        description: state.message
      })
    }
  },[state, toast, router])

  return (
    <form action={formAction}>
      <input type="hidden" name="role" value={role} />
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`${role}-email`}>Email</Label>
          <Input id={`${role}-email`} name="email" type="email" placeholder="m@example.com" required defaultValue={role === 'customer' ? 'john.doe@example.com' : 'jane.smith@example.com'} />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${role}-password`}>Contraseña</Label>
          <Input id={`${role}-password`} name="password" type="password" required defaultValue="password" />
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <SubmitButton role={role} />
        <div className="text-center text-sm">
          <Link href="/forgot-password" className="underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </CardFooter>
    </form>
  )
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-primary/5 p-4">
      <div className="absolute top-4 left-4">
        <Button variant="ghost" asChild>
          <Link href="/">&larr; Volver a Inicio</Link>
        </Button>
      </div>
      <Tabs defaultValue="customer" className="w-full max-w-md">
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <ShoppingCart className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-3xl font-headline">Bienvenido a ShopList Hub</CardTitle>
            <CardDescription>Por favor, selecciona tu rol para continuar</CardDescription>
          </CardHeader>
          <CardContent>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="customer">Cliente</TabsTrigger>
              <TabsTrigger value="store">Dueño de Tienda</TabsTrigger>
            </TabsList>
          </CardContent>
          <TabsContent value="customer">
            <LoginForm role="customer" />
          </TabsContent>
          <TabsContent value="store">
            <LoginForm role="store" />
          </TabsContent>
          <CardFooter className="flex-col gap-2 border-t pt-6">
            <div className="text-center text-sm text-muted-foreground">
              ¿No tienes una cuenta?{" "}
              <Link href="/register" className="underline text-primary">
                Regístrate
              </Link>
            </div>
          </CardFooter>
        </Card>
      </Tabs>
    </div>
  );
}
