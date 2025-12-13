export type UserRole = "customer" | "store";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageId: string; // This will now be a URL
  storeId: string;
  stock?: number;
}

export interface Store {
  _id: string;
  name: string;
  category: string;
  location: string;
  imagenURL: string;
  headerImageId: string;
  ownerId: string;
}

export interface ShoppingListItem {
  product: Product;
  quantity: number;
}
