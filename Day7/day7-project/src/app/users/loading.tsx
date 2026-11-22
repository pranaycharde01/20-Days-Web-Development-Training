
export default function UsersLoading() {
  return (
    <main className="mx-auto max-w-6xl space-y-6 p-6">
      <div>
        <div className="h-8 w-56 animate-pulse rounded bg-slate-200" />
        <div className="mt-3 h-4 w-72 animate-pulse rounded bg-slate-200" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-xl bg-white p-6 shadow-sm"
          >
            <div className="h-6 w-40 rounded bg-slate-200" />
            <div className="mt-3 h-4 w-28 rounded bg-slate-200" />

            <div className="mt-6 space-y-3">
              <div className="h-4 w-full rounded bg-slate-200" />
              <div className="h-4 w-3/4 rounded bg-slate-200" />
              <div className="h-4 w-5/6 rounded bg-slate-200" />
            </div>

            <div className="mt-6 h-10 w-32 rounded-lg bg-slate-200" />
          </div>
        ))}
      </div>
    </main>
  );
}
