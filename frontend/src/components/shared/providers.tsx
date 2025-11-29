"use client";

import { ThemeProvider } from "@/components/shared/theme-provider";
import { ShoppingListProvider } from "@/hooks/use-shopping-list";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <ShoppingListProvider>
                {children}
            </ShoppingListProvider>
        </ThemeProvider>
    );
}
