import { ReactNode } from "react";

import { AdminGuard } from "@/components/admin/AdminGuard";

export default function AdminLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <AdminGuard>{children}</AdminGuard>;
}
