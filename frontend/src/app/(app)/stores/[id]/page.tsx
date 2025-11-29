"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { stores, products as allProducts } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { StoreProducts } from "./_components/store-products";
import React from "react";

export default function StorePage({ params }: { params: { id: string } }) {
  const resolvedParams = React.use(params);
  const store = stores.find((s) => s.id === resolvedParams.id);
  if (!store) {
    notFound();
  }

  const products = allProducts.filter((p) => p.storeId === store.id);
  const headerImage = PlaceHolderImages.find(
    (p) => p.id === store.headerImageId
  );

  return (
    <div className="space-y-8">
      <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden shadow-lg">
        {headerImage && (
          <Image
            src={headerImage.imageUrl}
            alt={store.name}
            fill
            className="object-cover"
            data-ai-hint={headerImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50 flex items-end p-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-headline">
            {store.name}
          </h1>
        </div>
      </div>

      <StoreProducts products={products} />
    </div>
  );
}
