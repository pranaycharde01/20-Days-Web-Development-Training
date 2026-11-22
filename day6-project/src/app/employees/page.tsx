
"use client";

import Link from "next/link";
import { useState } from "react";

type Employee = {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "Active" | "On Leave";
};

const employees: Employee[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav@example.com",
    role: "Frontend Developer",
    department: "Engineering",
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya@example.com",
    role: "UI/UX Designer",
    department: "Design",
    status: "Active",
  },
  {
    id: 3,
    name: "Rahul Verma",
    email: "rahul@example.com",
    role: "Backend Developer",
    department: "Engineering",
    status: "Active",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    email: "sneha@example.com",
    role: "HR Manager",
    department: "Human Resources",
    status: "On Leave",
  },
  {
    id: 5,
    name: "Vikram Singh",
    email: "vikram@example.com",
    role: "Marketing Executive",
    department: "Marketing",
    status: "Active",
  },
];

export default function EmployeesPage() {
  const [search, setSearch] = useState("");

  const filteredEmployees = employees.filter((employee) => {
    const searchText = search.toLowerCase();

    return (
      employee.name.toLowerCase().includes(searchText) ||
      employee.department.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Employees
          </h1>

          <p className="mt-2 text-slate-500">
            View and manage your organization employees.
          </p>
        </div>

        <Link
          href="/employees/add"
          className="rounded-lg bg-blue-600 px-5 py-3 text-center font-medium text-white transition hover:bg-blue-700"
        >
          + Add Employee
        </Link>
      </section>

      {/* Search */}
      <section className="rounded-xl bg-white p-5 shadow-sm">
        <label
          htmlFor="employee-search"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Search employees
        </label>

        <input
          id="employee-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name or department..."
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </section>

      {/* Employee Table */}
      <section className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="text-lg font-bold text-slate-900">
            Employee Directory
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Showing {filteredEmployees.length} of {employees.length} employees
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left">
            <thead className="bg-slate-50">
              <tr className="text-sm text-slate-500">
                <th className="px-5 py-4 font-medium">Employee</th>
                <th className="px-5 py-4 font-medium">Role</th>
                <th className="px-5 py-4 font-medium">Department</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-800">
                      {employee.name}
                    </p>

                    <p className="text-sm text-slate-400">
                      {employee.email}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {employee.role}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {employee.department}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        employee.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <Link
                      href={`/employees/${employee.id}`}
                      className="font-medium text-blue-600 hover:text-blue-800"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}

              {filteredEmployees.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center text-slate-500"
                  >
                    No employees found. Try another search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
