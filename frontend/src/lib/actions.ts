
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { UserRole } from "./types";
import { users, stores, products } from "./data";

export async function login(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;

  let user = null;

  try {
    const res = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, role }),
    });
    user = await res.json();
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }

  if (user?.id) {
    const cookieStore = await cookies();

    cookieStore.set("user_id", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    cookieStore.set("user_role", user.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return { success: true, role: user.role };
  }

  return {
    message: "Credenciales inválidas.",
    success: false,
  };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("user_id");
  cookieStore.delete("user_role");

  redirect("/login");
}

export async function registerUser(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as UserRole;

  if (!name || !email || !password || !role) {
    return { message: "Todos los campos son obligatorios" };
  }

  if (users.some(u => u.email === email)) {
    return { message: "El correo electrónico ya está en uso" };
  }

  const newUser = {
    name,
    email,
    role,
    password,
    avatar: "/avatars/03.png",
  };


try {
  const response = await fetch("http://localhost:8080/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
  const data = await response.json();

  const cookieStore = await cookies();

  cookieStore.set("user_id", data.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
    cookieStore.set("user_role", newUser.role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  console.log("Respuesta del servidor:", data);
} catch (error) {
  console.error("Error al enviar usuario:", error);
}

  if (role === 'customer') {
    redirect("/dashboard");
  } else {
    redirect("/store/dashboard");
  }
}


export async function addProductAction(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const storeId = formData.get("storeId") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const imageId = formData.get("imageId") as string;

  if (!storeId || !name || !description || !price || !imageId) {
    return { message: "Todos los campos son obligatorios." };
  }
  
  const newProduct = {
      storeId,
      name,
      description,
      price: parseInt(price, 10),
      imageId,
      stock: 0,
  }

  try {
    let res = await fetch("http://localhost:8080/api/product", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
    })
    const data = await res.json()
    return data.response
  } catch (error) {
    console.log(error)
  }
  console.log("New product added (simulated):", newProduct);

  return { message: "success" };
}

export async function updateProductAction(productId: string, prevState: any, formData: FormData) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const storeId = formData.get("storeId") as string;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const imageId = formData.get("imageId") as string;

    if (!storeId || !name || !description || !price || !imageId) {
      return { message: "Todos los campos son obligatorios." };
    }

    const productIndex = products.findIndex(p => p._id === productId);

    if(productIndex === -1) {
        return { message: "Producto no encontrado." };
    }

    const updatedProduct = {
        ...products[productIndex],
        storeId,
        name,
        description,
        price: parseInt(price, 10),
        imageId,
    }

    products[productIndex] = updatedProduct;

    console.log(`Product ${productId} updated (simulated):`, updatedProduct);
    
    return { message: "success" };
}

export async function deleteProductAction(productId: string) {
  try {
    const response = await fetch("http://localhost:8080/api/product", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      }
  })
      return response
    } catch (error) {
      console.log(error)
    }
    console.log(`Product ${productId} deleted (simulated).`);
    const index = products.findIndex(p => p._id === productId);
    if (index !== -1) {
        products.splice(index, 1);
    }
}

export async function addStoreAction(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const location = formData.get("location") as string;
  const imagenURL = formData.get("imagenURL") as string;
  const ownerId = await UserId()

  if (!name || !category || !location) {
    return { message: "Todos los campos son obligatorios.", error: true, timestamp: Date.now() };
  }
  const newStoreData = { name, category, location, ownerId, imagenURL };

  console.log("New store added (simulated):", newStoreData);

  try {
    const res = await fetch("http://localhost:8080/api/store", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newStoreData),
    })
    const data = await res.json()
    return { message: "success", store: data.response, timestamp: data.response.createdAt };
  } catch (error) {
    console.error(error)
  }
  // In a real app, you'd save this to a DB and get a full store object back
}

export async function updateStoreAction(storeId: string, prevState: any, formData: FormData) {
  await new Promise(resolve => setTimeout(resolve, 500));
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const location = formData.get("location") as string;

  if (!name || !category || !location) {
    return { message: "Todos los campos son obligatorios.", error: true, timestamp: Date.now() };
  }

  const storeIndex = stores.findIndex(s => s._id === storeId);
  if (storeIndex === -1) {
    return { message: "Tienda no encontrada.", error: true, timestamp: Date.now() };
  }

  const updatedStore = {
    ...stores[storeIndex],
    name,
    category,
    location,
  };

  // In a real app, you'd save this to a DB. Here we simulate it.
  stores[storeIndex] = updatedStore;
  console.log("Store updated (simulated):", updatedStore);

  return { message: "success", store: updatedStore, timestamp: Date.now() };
}

export async function getStores() {
  try {
    let res = await fetch("http://localhost:8080/api/store", {
      method: "GET",
      headers: {
      "Content-Type": "application/json",
      }})
    const data = await res.json();
    return data.response
  } catch (error) {
    console.error(error)
  }
}

export default async function UserId() {
  try {
  const cookieStore = await cookies();
  const OWNER_ID = cookieStore.get("user_id")?.value;
  return OWNER_ID;
  } catch (error) {
    console.error(error)
  }
}

export async function getProducts() {
    try {
      let res = await fetch("http://localhost:8080/api/product", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }})
        const data = await res.json()
        return data.response
    } catch (error) {
      console.error(error)
    }
}

  export async function user(userId: String) {
    try {
      const res = await fetch("http://localhost:8080/api/user/validate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id: userId}),
  });
  const data = await res.json();
  return data
    } catch (error) {
  console.error("Error al enviar usuario:", error);
    }
  }
