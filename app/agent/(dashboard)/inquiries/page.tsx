import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAgent } from "@/lib/auth";
import { markInquiryRead, markInquiryUnread } from "@/app/actions/inquiries";

export default async function AgentInquiriesPage() {
  const auth = await requireAgent();
  if (!auth) redirect("/agent/login");

  const inquiries = await prisma.inquiry.findMany({
    where: { property: { agentId: auth.agent.id } },
    include: { property: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-green">Inquiries</h1>
        <p className="mt-1 text-ink/60">
          {inquiries.filter((i) => !i.read).length} unread of {inquiries.length} total
        </p>
      </div>

      <div className="space-y-4">
        {inquiries.map((inq) => (
          <article
            key={inq.id}
            className={`rounded-2xl bg-white p-6 shadow-sm shadow-black/5 ${
              !inq.read ? "ring-1 ring-sand" : ""
            }`}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold text-ink">{inq.name}</h2>
                  {!inq.read && (
                    <span className="rounded-full bg-sand px-2 py-0.5 text-xs font-semibold text-green">
                      Unread
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-ink/60">
                  {inq.email}
                  {inq.phone ? ` · ${inq.phone}` : ""}
                </p>
                <p className="mt-1 text-sm">
                  Re:{" "}
                  <Link
                    href={`/listings/${inq.propertyId}`}
                    className="font-medium text-green hover:underline"
                  >
                    {inq.property.title}
                  </Link>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-ink/40">
                  {inq.createdAt.toLocaleString()}
                </span>
                {inq.read ? (
                  <form action={markInquiryUnread.bind(null, inq.id)}>
                    <button
                      type="submit"
                      className="rounded-full border border-ink/10 px-3 py-1.5 text-xs font-semibold"
                    >
                      Mark unread
                    </button>
                  </form>
                ) : (
                  <form action={markInquiryRead.bind(null, inq.id)}>
                    <button
                      type="submit"
                      className="rounded-full bg-green px-3 py-1.5 text-xs font-semibold text-white"
                    >
                      Mark read
                    </button>
                  </form>
                )}
              </div>
            </div>
            <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-ink/80">
              {inq.message}
            </p>
          </article>
        ))}

        {inquiries.length === 0 && (
          <div className="rounded-2xl bg-white p-10 text-center text-ink/50 shadow-sm">
            No inquiries yet. They will appear here when buyers submit the form on a listing.
          </div>
        )}
      </div>
    </div>
  );
}
