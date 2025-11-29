import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { stores } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CustomerDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 font-headline">Tiendas Disponibles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {stores.map((store) => {
          const image = PlaceHolderImages.find((p) => p.id === store.imageId);
          return (
            <Link key={store.id} href={`/stores/${store.id}`} className="group">
              <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {image && (
                  <div className="relative w-full h-40">
                    <Image
                      src={image.imageUrl}
                      alt={store.name}
                      fill
                      className="object-cover"
                      data-ai-hint={image.imageHint}
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="font-headline text-xl">{store.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{store.category}</p>
                    <p className="text-sm text-muted-foreground">{store.location}</p>
                  </div>
                  <div className="flex items-center justify-end text-primary mt-4 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Ver Productos <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
