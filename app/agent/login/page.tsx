import LoginForm from "@/components/LoginForm";

export default async function AgentLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ emailChanged?: string }>;
}) {
  const params = await searchParams;
  const emailChanged = params.emailChanged === "1";

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-6 py-16">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm shadow-black/5">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-sand">
            Agent portal
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-green">Welcome back</h1>
          <p className="mt-2 text-sm text-ink/60">
            Sign in to manage listings and inquiries.
          </p>
        </div>
        {emailChanged && (
          <div className="mb-5 rounded-xl bg-green/10 px-4 py-3 text-sm text-green">
            Email updated. Please sign in with your new email address.
          </div>
        )}
        <LoginForm />
      </div>
    </div>
  );
}