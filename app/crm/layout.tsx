import Sidebar from "@/components/crm/Sidebar";
import { createClient } from "@/lib/supabase-server";

export const metadata = {
  title: "Axis Residences — CRM",
  description: "Realtor workspace for Axis Residences",
};

export default async function CRMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-cream-2 lg:flex">
      {user && <Sidebar userEmail={user.email || ""} />}
      <main className="flex-1 min-h-screen overflow-x-hidden">{children}</main>
    </div>
  );
}
