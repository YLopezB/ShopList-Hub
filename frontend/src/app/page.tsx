import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, ListChecks, Store } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === "hero");
  const featureImage1 = PlaceHolderImages.find(p => p.id === "feature-1");

  const features = [
    {
      icon: <ShoppingCart className="h-8 w-8 text-primary" />,
      title: "Crea tu Lista",
      description: "Crea y gestiona fácilmente listas de compras para cualquier tienda.",
    },
    {
      icon: <Store className="h-8 w-8 text-primary" />,
      title: "Descubre Tiendas",
      description: "Explora tiendas locales y mira lo que tienen para ofrecer.",
    },
    {
      icon: <ListChecks className="h-8 w-8 text-primary" />,
      title: "Para Dueños de Tiendas",
      description: "Gestiona tus productos y conecta con los clientes.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold font-headline">ShopList Hub</h1>
        </div>
        <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button asChild>
                <Link href="/login">Comenzar</Link>
            </Button>
        </div>
      </header>

      <main className="flex-grow">
        <section className="relative py-20 md:py-32 bg-background">
           <div className="absolute inset-0 bg-primary/10 -skew-y-3"></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-6xl font-bold font-headline mb-4">
              Compra Inteligente, Vive Simple.
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Tu compañero definitivo para listas de compras. Crea listas, descubre tiendas y optimiza tus compras, todo en un solo lugar.
            </p>
            <Button size="lg" asChild>
              <Link href="/login">Crea Tu Primera Lista</Link>
            </Button>
          </div>
        </section>

        {heroImage && (
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
            <Card className="overflow-hidden shadow-2xl">
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={1200}
                height={600}
                className="w-full object-cover"
                data-ai-hint={heroImage.imageHint}
              />
            </Card>
          </section>
        )}

        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold font-headline">Todo lo que necesitas</h3>
              <p className="text-muted-foreground mt-2">Un potente conjunto de herramientas para compradores y dueños de tiendas por igual.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h4 className="text-xl font-semibold mb-2 font-headline">{feature.title}</h4>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-20 md:py-28 bg-primary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
            {featureImage1 && (
              <Image
                src={featureImage1.imageUrl}
                alt={featureImage1.description}
                width={600}
                height={400}
                className="rounded-lg shadow-lg object-cover w-full h-full"
                data-ai-hint={featureImage1.imageHint}
              />
            )}
            <div>
              <h3 className="text-3xl md:text-4xl font-bold font-headline">Una Experiencia Fluida</h3>
              <p className="text-muted-foreground mt-4 mb-6">Nuestro diseño limpio y organizado garantiza una experiencia intuitiva en todos tus dispositivos. Gestiona tus listas de compras desde tu escritorio o sobre la marcha.</p>
              <Button variant="link" asChild className="p-0 h-auto text-primary">
                <Link href="/login">Explora las funciones &rarr;</Link>
              </Button>
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-background border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ShopList Hub. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
