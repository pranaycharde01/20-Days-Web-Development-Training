
import Link from "next/link";

const employees = [
  {
    id: 1,
    name: "Aarav Sharma",
    role: "Frontend Developer",
    department: "Engineering",
    email: "aarav@example.com",
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "UI/UX Designer",
    department: "Design",
    email: "priya@example.com",
    status: "Active",
  },
  {
    id: 3,
    name: "Rahul Verma",
    role: "Backend Developer",
    department: "Engineering",
    email: "rahul@example.com",
    status: "Active",
  },
];

const stats = [
  {
    title: "Total Employees",
    value: "24",
    description: "Registered employees",
    color: "border-blue-500",
  },
  {
    title: "Active Employees",
    value: "21",
    description: "Currently working",
    color: "border-green-500",
  },
  {
    title: "Departments",
    value: "5",
    description: "Active departments",
    color: "border-purple-500",
  },
  {
    title: "On Leave",
    value: "3",
    description: "Currently on leave",
    color: "border-orange-500",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Dashboard
          </h1>
          <p className="mt-2 text-slate-500">
            Welcome back! Here is your employee overview.
          </p>
        </div>

        <Link
          href="/employees"
          className="rounded-lg bg-blue-600 px-5 py-3 text-center font-medium text-white transition hover:bg-blue-700"
        >
          View Employees
        </Link>
      </section>

      {/* Statistics Cards */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.title}
            className={`rounded-xl border-l-4 ${stat.color} bg-white p-6 shadow-sm`}
          >
            <p className="text-sm font-medium text-slate-500">
              {stat.title}
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              {stat.value}
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              {stat.description}
            </p>
          </article>
        ))}
      </section>

      {/* Recent Employees */}
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Recent Employees
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Recently added team members
            </p>
          </div>

          <Link
            href="/employees"
            className="font-medium text-blue-600 hover:text-blue-800"
          >
            View all
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left">
            <thead>
              <tr className="border-b border-slate-200 text-sm text-slate-500">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Department</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                >
                  <td className="px-4 py-4">
                    <p className="font-semibold text-slate-800">
                      {employee.name}
                    </p>
                    <p className="text-sm text-slate-400">
                      {employee.email}
                    </p>
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-600">
                    {employee.role}
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-600">
                    {employee.department}
                  </td>

                  <td className="px-4 py-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      {employee.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
