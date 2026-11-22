
import Link from "next/link";
import { notFound } from "next/navigation";
import { getUser } from "@/lib/users";

type UserDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UserDetailsPage({
  params,
}: UserDetailsPageProps) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const user = await getUser(id);

  if (!user) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <Link
        href="/users"
        className="font-medium text-blue-600 hover:text-blue-800"
      >
        ← Back to Users
      </Link>

      <section className="rounded-xl bg-white p-8 shadow-sm">
        <div className="border-b border-slate-100 pb-6">
          <h1 className="text-3xl font-bold text-slate-900">
            {user.name}
          </h1>

          <p className="mt-2 text-slate-500">
            @{user.username}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm text-slate-400">User ID</p>
            <p className="mt-1 font-semibold">{user.id}</p>
          </div>

          <div>
            <p className="text-sm text-slate-400">Email</p>
            <p className="mt-1 font-semibold">{user.email}</p>
          </div>

          <div>
            <p className="text-sm text-slate-400">Phone</p>
            <p className="mt-1 font-semibold">{user.phone}</p>
          </div>

          <div>
            <p className="text-sm text-slate-400">Website</p>
            <p className="mt-1 font-semibold">{user.website}</p>
          </div>

          <div>
            <p className="text-sm text-slate-400">City</p>
            <p className="mt-1 font-semibold">{user.address.city}</p>
          </div>

          <div>
            <p className="text-sm text-slate-400">Company</p>
            <p className="mt-1 font-semibold">{user.company.name}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
