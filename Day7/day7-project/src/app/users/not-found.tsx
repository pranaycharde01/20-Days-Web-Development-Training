
import Link from "next/link";

export default function UserNotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center p-6">
      <section className="max-w-md rounded-xl bg-white p-8 text-center shadow-sm">
        <h1 className="text-5xl font-bold text-slate-900">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold text-slate-800">
          User Not Found
        </h2>

        <p className="mt-3 text-slate-500">
          Sorry, the user you are looking for does not exist.
        </p>

        <Link
          href="/users"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
        >
          Back to Users
        </Link>
      </section>
    </main>
  );
}
