import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar";
import { UserNav } from "@/components/shared/user-nav";
import { users } from "@/lib/data";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ShoppingCart, LayoutDashboard, Store, List, Package } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ShoppingListBadge } from "./_components/shopping-list-badge";
import { ThemeToggle } from "@/components/shared/theme-toggle";

const customerNav = [
  {
    href: "/dashboard",
    label: "Tiendas",
    icon: Store,
  },
  {
    href: "/shopping-list",
    label: "Lista de Compras",
    icon: List,
    badge: true,
  },
];

const storeNav = [
  {
    href: "/store/dashboard",
    label: "Panel de Control",
    icon: LayoutDashboard,
  },
  {
    href: "/store/products",
    label: "Productos",
    icon: Package,
  },
];


export default function AppLayout({ children }: { children: React.ReactNode }) {
  const userId = cookies().get("user_id")?.value;
  
  if (!userId) {
    redirect('/login');
  }

  //const user = users.find((u) => u.id === userId);

  const user = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/user/validate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userId),
  });
  const user = await res.json();
    } catch (error) {
  console.error("Error al enviar usuario:", error);
    }
  }



  if (!user) {
    // This case might happen if the cookie is stale
    cookies().delete("user_id");
    cookies().delete("user_role");
    redirect('/login');
  }

  const userRole = user.role;
  const navItems = userRole === 'customer' ? customerNav : storeNav;

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 text-primary" />
              <h2 className="text-lg font-semibold font-headline">ShopList Hub</h2>
            </div>
          </SidebarHeader>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href} asChild>
                <Link href={item.href}>
                  <SidebarMenuButton>
                    <item.icon />
                    <span>{item.label}</span>
                    {item.badge && <ShoppingListBadge />}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
          <SidebarTrigger />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserNav user={user} />
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
