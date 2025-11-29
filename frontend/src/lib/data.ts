import type { User, Store, Product } from "./types";

export const users: User[] = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "customer",
    avatar: "/avatars/01.png",
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "store",
    avatar: "/avatars/02.png",
  },
];

export const stores: Store[] = [
  {
    id: "store-1",
    name: "Mercado Fresco",
    category: "Abarrotes",
    location: "Calle 123, Bogotá",
    imageId: "store-1",
    headerImageId: "store-header-1",
    ownerId: "user-2",
  },
  {
    id: "store-2",
    name: "Raíces Orgánicas",
    category: "Orgánico",
    location: "Avenida 45, Medellín",
    imageId: "store-2",
    headerImageId: "store-header-2",
    ownerId: "user-3", // Belongs to a different owner for demo purposes
  },
  {
    id: "store-3",
    name: "Super Ahorro",
    category: "Supermercado",
    location: "Carrera 7, Cali",
    imageId: "store-3",
    headerImageId: "store-header-3",
    ownerId: "user-4",
  },
  {
    id: "store-4",
    name: "El Rincón Gourmet",
    category: "Gourmet",
    location: "Diagonal 10, Barranquilla",
    imageId: "store-4",
    headerImageId: "store-header-4",
    ownerId: "user-2",
  },
];

const getProductImage = (id: string): string => {
  const image = PlaceHolderImages.find(p => p.id === id);
  return image ? image.imageUrl : 'https://placehold.co/400x400/EBF5FF/60A5FA?text=Producto';
}

// Import placeholder images to find URLs. In a real app, these would come from a CMS or DB.
import { PlaceHolderImages } from "./placeholder-images";

export const products: Product[] = [
  // Products for Mercado Fresco (store-1)
  {
    id: "prod-1",
    storeId: "store-1",
    name: "Manzanas Orgánicas",
    description: "Manzanas Gala orgánicas, frescas y jugosas (Libra).",
    price: 4500,
    imageId: getProductImage("product-apples"),
    stock: 50,
  },
  {
    id: "prod-2",
    storeId: "store-1",
    name: "Pan Integral Artesanal",
    description: "Hogaza de pan integral recién horneada.",
    price: 8000,
    imageId: getProductImage("product-bread"),
    stock: 30,
  },
  {
    id: "prod-3",
    storeId: "store-1",
    name: "Leche Orgánica",
    description: "1 litro de leche entera orgánica fresca.",
    price: 5500,
    imageId: getProductImage("product-milk"),
    stock: 20,
  },
  {
    id: "prod-4",
    storeId: "store-1",
    name: "Huevos Campesinos",
    description: "Docena de huevos grandes de gallinas criadas en libertad.",
    price: 9000,
    imageId: getProductImage("product-eggs"),
    stock: 40,
  },
  // Products for Raíces Orgánicas (store-2)
  {
    id: "prod-5",
    storeId: "store-2",
    name: "Queso Paipa",
    description: "Queso madurado artesanal con un sabor intenso.",
    price: 15000,
    imageId: getProductImage("product-cheese"),
    stock: 15,
  },
  {
    id: "prod-6",
    storeId: "store-2",
    name: "Pechuga de Pollo Orgánico",
    description: "Pechugas de pollo orgánico sin piel y sin hueso (Libra).",
    price: 18000,
    imageId: getProductImage("product-chicken"),
    stock: 25,
  },
  // Products for Super Ahorro (store-3)
  {
    id: "prod-7",
    storeId: "store-3",
    name: "Lechuga Romana",
    description: "Una cabeza fresca de lechuga romana.",
    price: 2500,
    imageId: getProductImage("product-lettuce"),
    stock: 60,
  },
  {
    id: "prod-8",
    storeId: "store-3",
    name: "Tomates Chonto",
    description: "Tomates dulces y jugosos, vendidos por libra.",
    price: 3000,
    imageId: getProductImage("product-tomatoes"),
    stock: 70,
  },
];
