import { redirect } from "next/navigation";
import ChangeEmailForm from "@/components/ChangeEmailForm";
import ChangePasswordForm from "@/components/ChangePasswordForm";
import { requireAgent } from "@/lib/auth";

export default async function AgentSettingsPage() {
  const auth = await requireAgent();
  if (!auth) redirect("/agent/login");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-green sm:text-3xl">Settings</h1>
        <p className="mt-0.5 text-ink/60">
          Manage your agent account preferences.
        </p>
        <p className="mt-2 text-sm text-ink/70">
          Signed in as{" "}
          <span className="font-medium text-ink">{auth.agent.email}</span>
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <section className="w-full rounded-2xl bg-white p-6 shadow-sm shadow-black/5 sm:p-8">
          <h2 className="text-lg font-bold text-ink">Change email</h2>
          <p className="mt-1 mb-6 text-sm text-ink/50">
            Update the email used to sign in. You will need to log in again with
            the new address.
          </p>
          <ChangeEmailForm />
        </section>

        <section className="w-full rounded-2xl bg-white p-6 shadow-sm shadow-black/5 sm:p-8">
          <h2 className="text-lg font-bold text-ink">Change password</h2>
          <p className="mt-1 mb-6 text-sm text-ink/50">
            This updates the Neon agent account password used to sign in to the
            dashboard.
          </p>
          <ChangePasswordForm />
        </section>
      </div>
    </div>
  );
}