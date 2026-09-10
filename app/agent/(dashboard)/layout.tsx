import { redirect } from "next/navigation";
import AgentNav from "@/components/AgentNav";
import { requireAgent } from "@/lib/auth";

export default async function AgentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await requireAgent();
  if (!auth) redirect("/agent/login");

  return (
    <div className="min-h-screen bg-cream">
      <AgentNav />
      <main className="mx-auto max-w-7xl px-6 py-6 lg:px-10 lg:py-8">{children}</main>
    </div>
  );
}