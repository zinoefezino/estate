import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAgent } from "@/lib/auth";
import { redirect } from "next/navigation";
import { formatPrice, listingBadge } from "@/lib/format";

export default async function AgentDashboardPage() {
  const auth = await requireAgent();
  if (!auth) redirect("/agent/login");

  const [propertyCount, availableCount, inquiryCount, unreadCount, recentInquiries, recentProperties] =
    await Promise.all([
      prisma.property.count({ where: { agentId: auth.agent.id } }),
      prisma.property.count({
        where: { agentId: auth.agent.id, status: "available" },
      }),
      prisma.inquiry.count({
        where: { property: { agentId: auth.agent.id } },
      }),
      prisma.inquiry.count({
        where: { read: false, property: { agentId: auth.agent.id } },
      }),
      prisma.inquiry.findMany({
        where: { property: { agentId: auth.agent.id } },
        include: { property: true },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.property.findMany({
        where: { agentId: auth.agent.id },
        orderBy: { updatedAt: "desc" },
        take: 5,
      }),
    ]);

  const stats = [
    { label: "Properties", value: propertyCount },
    { label: "Available", value: availableCount },
    { label: "Inquiries", value: inquiryCount },
    { label: "Unread", value: unreadCount },
  ];

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-green sm:text-3xl">Dashboard</h1>
          <p className="mt-0.5 text-ink/60">Manage listings and buyer inquiries.</p>
        </div>
        <Link
          href="/agent/properties/new"
          className="rounded-full bg-green px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-light"
        >
          Add property
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-white p-4 shadow-sm shadow-black/5 lg:p-5">
            <div className="text-2xl font-extrabold text-green lg:text-3xl">{stat.value}</div>
            <div className="mt-0.5 text-sm text-ink/60">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <section className="rounded-2xl bg-white p-5 shadow-sm shadow-black/5 sm:p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-ink">Recent properties</h2>
            <Link href="/agent/properties" className="text-sm font-medium text-green">
              View all
            </Link>
          </div>
          <ul className="divide-y divide-ink/10">
            {recentProperties.map((p) => (
              <li key={p.id} className="flex items-center justify-between py-2.5">
                <div>
                  <Link
                    href={`/agent/properties/${p.id}/edit`}
                    className="font-medium text-ink hover:text-green"
                  >
                    {p.title}
                  </Link>
                  <p className="text-sm text-ink/50">
                    {formatPrice(p.price, p.listingType)} · {listingBadge(p.listingType, p.status)}
                  </p>
                </div>
              </li>
            ))}
            {recentProperties.length === 0 && (
              <li className="py-5 text-sm text-ink/50">No properties yet.</li>
            )}
          </ul>
        </section>

        <section className="rounded-2xl bg-white p-5 shadow-sm shadow-black/5 sm:p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-ink">Recent inquiries</h2>
            <Link href="/agent/inquiries" className="text-sm font-medium text-green">
              View all
            </Link>
          </div>
          <ul className="divide-y divide-ink/10">
            {recentInquiries.map((inq) => (
              <li key={inq.id} className="py-2.5">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-ink">
                    {inq.name}
                    {!inq.read && (
                      <span className="ml-2 rounded-full bg-sand px-2 py-0.5 text-xs font-semibold text-green">
                        New
                      </span>
                    )}
                  </p>
                  <span className="text-xs text-ink/40">
                    {inq.createdAt.toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-ink/50">{inq.property.title}</p>
              </li>
            ))}
            {recentInquiries.length === 0 && (
              <li className="py-5 text-sm text-ink/50">No inquiries yet.</li>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}