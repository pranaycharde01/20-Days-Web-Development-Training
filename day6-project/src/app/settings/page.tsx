
import Link from "next/link";

const settingsGroups = [
  {
    title: "Application Information",
    description: "Basic details about this application.",
    items: [
      { label: "Application Name", value: "EmployeeHub" },
      { label: "Version", value: "1.0.0" },
      { label: "Framework", value: "Next.js 16" },
    ],
  },
  {
    title: "Company Information",
    description: "Organization details.",
    items: [
      { label: "Company Name", value: "EmployeeHub Technologies" },
      { label: "Department Count", value: "5 Departments" },
      { label: "Registered Employees", value: "24 Employees" },
    ],
  },
  {
    title: "Technology Stack",
    description: "Technologies used to build this project.",
    items: [
      { label: "Frontend", value: "Next.js and React" },
      { label: "Language", value: "TypeScript" },
      { label: "Styling", value: "Tailwind CSS" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section>
        <h1 className="text-3xl font-bold text-slate-900">
          Settings
        </h1>

        <p className="mt-2 text-slate-500">
          View application and company information.
        </p>
      </section>

      {settingsGroups.map((group) => (
        <section
          key={group.title}
          className="rounded-xl bg-white p-6 shadow-sm"
        >
          <h2 className="text-xl font-bold text-slate-900">
            {group.title}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {group.description}
          </p>

          <div className="mt-5 divide-y divide-slate-100">
            {group.items.map((item) => (
              <div
                key={item.label}
                className="flex flex-col justify-between gap-2 py-4 sm:flex-row sm:items-center"
              >
                <span className="text-sm font-medium text-slate-600">
                  {item.label}
                </span>

                <span className="text-sm font-semibold text-slate-900">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="rounded-xl border border-blue-100 bg-blue-50 p-6">
        <h2 className="text-lg font-bold text-blue-900">
          Need help?
        </h2>

        <p className="mt-2 text-sm text-blue-800">
          Visit the employee directory to view your team members.
        </p>

        <Link
          href="/employees"
          className="mt-4 inline-block rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Go to Employees
        </Link>
      </section>
    </div>
  );
}
