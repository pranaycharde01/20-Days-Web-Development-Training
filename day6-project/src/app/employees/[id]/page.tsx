
import Link from "next/link";
import { notFound } from "next/navigation";

type Employee = {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "Active" | "On Leave";
  joiningDate: string;
  phone: string;
};

const employees: Employee[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav@example.com",
    role: "Frontend Developer",
    department: "Engineering",
    status: "Active",
    joiningDate: "January 15, 2025",
    phone: "+91 9876543210",
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya@example.com",
    role: "UI/UX Designer",
    department: "Design",
    status: "Active",
    joiningDate: "March 10, 2025",
    phone: "+91 9876543211",
  },
  {
    id: 3,
    name: "Rahul Verma",
    email: "rahul@example.com",
    role: "Backend Developer",
    department: "Engineering",
    status: "Active",
    joiningDate: "June 20, 2025",
    phone: "+91 9876543212",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    email: "sneha@example.com",
    role: "HR Manager",
    department: "Human Resources",
    status: "On Leave",
    joiningDate: "August 5, 2024",
    phone: "+91 9876543213",
  },
  {
    id: 5,
    name: "Vikram Singh",
    email: "vikram@example.com",
    role: "Marketing Executive",
    department: "Marketing",
    status: "Active",
    joiningDate: "February 12, 2025",
    phone: "+91 9876543214",
  },
];

type EmployeeDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EmployeeDetailsPage({
  params,
}: EmployeeDetailsPageProps) {
  const { id } = await params;

  const employeeId = Number(id);

  if (!Number.isInteger(employeeId) || employeeId <= 0) {
    notFound();
  }

  const employee = employees.find((item) => item.id === employeeId);

  if (!employee) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <section>
        <Link
          href="/employees"
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          ← Back to Employees
        </Link>

        <h1 className="mt-4 text-3xl font-bold text-slate-900">
          Employee Details
        </h1>

        <p className="mt-2 text-slate-500">
          Complete employee information.
        </p>
      </section>

      <section className="rounded-xl bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-700">
            {employee.name.charAt(0)}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {employee.name}
            </h2>

            <p className="mt-1 text-slate-500">
              {employee.role}
            </p>
          </div>

          <span
            className={`w-fit rounded-full px-4 py-2 text-sm font-semibold sm:ml-auto ${
              employee.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-orange-100 text-orange-700"
            }`}
          >
            {employee.status}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm text-slate-400">Employee ID</p>
            <p className="mt-1 font-semibold text-slate-800">
              EMP-{employee.id.toString().padStart(3, "0")}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">Department</p>
            <p className="mt-1 font-semibold text-slate-800">
              {employee.department}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">Email Address</p>
            <p className="mt-1 font-semibold text-slate-800">
              {employee.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">Phone Number</p>
            <p className="mt-1 font-semibold text-slate-800">
              {employee.phone}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">Joining Date</p>
            <p className="mt-1 font-semibold text-slate-800">
              {employee.joiningDate}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
