import ChangePasswordForm from "@/components/ChangePasswordForm";

export default function AgentSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-green">Settings</h1>
        <p className="mt-1 text-ink/60">
          Manage your agent account preferences.
        </p>
      </div>

      <section className="max-w-md rounded-2xl bg-white p-6 shadow-sm shadow-black/5 sm:p-8">
        <h2 className="text-lg font-bold text-ink">Change password</h2>
        <p className="mt-1 mb-6 text-sm text-ink/50">
          This updates the Neon agent account password used to sign in to the
          dashboard.
        </p>
        <ChangePasswordForm />
      </section>
    </div>
  );
}