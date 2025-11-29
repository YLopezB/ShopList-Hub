import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default function ForgotPasswordPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
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
              <KeyRound className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-3xl font-headline">¿Olvidaste tu Contraseña?</CardTitle>
            <CardDescription>No te preocupes. Ingresa tu email y te enviaremos un enlace para recuperarla.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {searchParams?.success && (
                <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>¡Revisa tu correo!</AlertTitle>
                    <AlertDescription>
                    Si existe una cuenta con ese email, hemos enviado un enlace de recuperación.
                    </AlertDescription>
                </Alert>
            )}
            <form action="/forgot-password?success=true">
                <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                </div>
                <Button type="submit" className="w-full mt-4">
                    Enviar Enlace de Recuperación
                </Button>
            </form>
          </CardContent>
          <CardFooter>
            <div className="text-center text-sm text-muted-foreground w-full">
                ¿Recordaste tu contraseña?{" "}
                <Link href="/login" className="underline text-primary">
                    Inicia Sesión
                </Link>
            </div>
          </CardFooter>
        </Card>
    </div>
  );
}
