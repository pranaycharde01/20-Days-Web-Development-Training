
import Link from "next/link";
import { getUsers } from "@/lib/users";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <main className="mx-auto max-w-6xl space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          User Directory
        </h1>

        <p className="mt-2 text-slate-500">
          Users fetched from the JSONPlaceholder API.
        </p>

        <Link
          href="/client-users"
          className="mt-3 inline-block font-medium text-blue-600 hover:text-blue-800"
        >
          View Client-Side User Directory →
        </Link>
      </div>

      {users.length === 0 ? (
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold">
            No users found
          </h2>

          <p className="mt-2 text-slate-500">
            There are currently no users to display.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <article
              key={user.id}
              className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <h2 className="text-xl font-bold text-slate-900">
                {user.name}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                @{user.username}
              </p>

              <div className="mt-5 space-y-2 text-sm text-slate-600">
                <p>
                  <strong>Email:</strong> {user.email}
                </p>

                <p>
                  <strong>City:</strong> {user.address.city}
                </p>

                <p>
                  <strong>Company:</strong> {user.company.name}
                </p>
              </div>

              <Link
                href={`/users/${user.id}`}
                className="mt-5 inline-block rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
              >
                View Details
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
