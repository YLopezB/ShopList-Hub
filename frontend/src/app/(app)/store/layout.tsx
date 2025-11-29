import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userRole = cookies().get("user_role")?.value;

  if (userRole !== "store") {
    // Redirect to a more appropriate page if not a store owner
    redirect("/dashboard");
  }

  return <>{children}</>;
}
