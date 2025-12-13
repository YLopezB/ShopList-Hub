import type { User, Store, Product } from "./types";
import { getProducts, getStores } from "./actions";

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

export const stores: Store[] = await getStores()

const getProductImage = (id: string): string => {
  const image = PlaceHolderImages.find(p => p.id === id);
  return image ? image.imageUrl : 'https://placehold.co/400x400/EBF5FF/60A5FA?text=Producto';
}

// Import placeholder images to find URLs. In a real app, these would come from a CMS or DB.
import { PlaceHolderImages } from "./placeholder-images";

export const products: Product[] = await getProducts()/*[
  // Products for Mercado Fresco (store-1)
  {
    _id: "prod-1",
    storeId: "store-1",
    name: "Manzanas Orgánicas",
    description: "Manzanas Gala orgánicas, frescas y jugosas (Libra).",
    price: 4500,
    imageId: getProductImage("product-apples"),
    stock: 50,
  },
  {
    _id: "prod-2",
    storeId: "store-1",
    name: "Pan Integral Artesanal",
    description: "Hogaza de pan integral recién horneada.",
    price: 8000,
    imageId: getProductImage("product-bread"),
    stock: 30,
  },
  {
    _id: "prod-3",
    storeId: "store-1",
    name: "Leche Orgánica",
    description: "1 litro de leche entera orgánica fresca.",
    price: 5500,
    imageId: getProductImage("product-milk"),
    stock: 20,
  },
  {
    _id: "prod-4",
    storeId: "store-1",
    name: "Huevos Campesinos",
    description: "Docena de huevos grandes de gallinas criadas en libertad.",
    price: 9000,
    imageId: getProductImage("product-eggs"),
    stock: 40,
  },
  // Products for Raíces Orgánicas (store-2)
  {
    _id: "prod-5",
    storeId: "store-2",
    name: "Queso Paipa",
    description: "Queso madurado artesanal con un sabor intenso.",
    price: 15000,
    imageId: getProductImage("product-cheese"),
    stock: 15,
  },
  {
    _id: "prod-6",
    storeId: "store-2",
    name: "Pechuga de Pollo Orgánico",
    description: "Pechugas de pollo orgánico sin piel y sin hueso (Libra).",
    price: 18000,
    imageId: getProductImage("product-chicken"),
    stock: 25,
  },
  // Products for Super Ahorro (store-3)
  {
    _id: "prod-7",
    storeId: "store-3",
    name: "Lechuga Romana",
    description: "Una cabeza fresca de lechuga romana.",
    price: 2500,
    imageId: getProductImage("product-lettuce"),
    stock: 60,
  },
  {
    _id: "prod-8",
    storeId: "store-3",
    name: "Tomates Chonto",
    description: "Tomates dulces y jugosos, vendidos por libra.",
    price: 3000,
    imageId: getProductImage("product-tomatoes"),
    stock: 70,
  },
];*/
