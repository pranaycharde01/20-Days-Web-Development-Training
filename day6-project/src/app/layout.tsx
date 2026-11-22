
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Employee Management System",
  description: "Manage employees with a simple and modern dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-100 text-slate-800">
        <div className="flex min-h-screen flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="w-full bg-slate-900 p-6 text-white md:min-h-screen md:w-64">
            <h1 className="mb-8 text-2xl font-bold">
              Employee<span className="text-blue-400">Hub</span>
            </h1>

            <nav className="flex flex-row gap-3 md:flex-col">
              <Link
                href="/"
                className="rounded-lg px-4 py-3 transition hover:bg-slate-700"
              >
                Dashboard
              </Link>

              <Link
                href="/employees"
                className="rounded-lg px-4 py-3 transition hover:bg-slate-700"
              >
                Employees
              </Link>

              <Link
                href="/settings"
                className="rounded-lg px-4 py-3 transition hover:bg-slate-700"
              >
                Settings
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex flex-1 flex-col">
            <header className="border-b border-slate-200 bg-white px-6 py-5">
              <h2 className="text-xl font-semibold">
                Employee Management System
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Manage your team in one place
              </p>
            </header>

            <main className="flex-1 p-6">
              {children}
            </main>

            <footer className="border-t border-slate-200 bg-white px-6 py-4 text-center text-sm text-slate-500">
              © 2026 EmployeeHub. Built with Next.js and TypeScript.
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
