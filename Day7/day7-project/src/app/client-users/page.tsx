
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { User } from "@/lib/users";

export default function ClientUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function fetchUsers() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }

        const data = (await response.json()) as User[];

        if (!cancelled) {
          setUsers(data);
          setError("");
        }
      } catch {
        if (!cancelled) {
          setError("Unable to load users. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void fetchUsers();

    return () => {
      cancelled = true;
    };
  }, [retryCount]);

  function handleRetry() {
    setLoading(true);
    setError("");
    setRetryCount((count) => count + 1);
  }

  return (
    <main className="mx-auto max-w-6xl space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Client-Side User Directory
        </h1>

        <p className="mt-2 text-slate-500">
          Users fetched in the browser using useEffect.
        </p>

        <Link
          href="/users"
          className="mt-3 inline-block font-medium text-blue-600 hover:text-blue-800"
        >
          ← Server-Side User Directory
        </Link>
      </div>

      {loading ? (
        <p className="rounded-xl bg-white p-8 text-center shadow-sm">
          Loading users...
        </p>
      ) : error ? (
        <section className="rounded-xl bg-white p-8 text-center shadow-sm">
          <p className="text-red-600">{error}</p>

          <button
            onClick={handleRetry}
            className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Try Again
          </button>
        </section>
      ) : users.length === 0 ? (
        <p className="rounded-xl bg-white p-8 text-center shadow-sm">
          No users found.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <article
              key={user.id}
              className="rounded-xl bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-slate-900">
                {user.name}
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                {user.email}
              </p>

              <p className="mt-2 text-sm text-slate-600">
                {user.address.city}
              </p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
