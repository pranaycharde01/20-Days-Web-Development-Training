
import type { Employee } from '../types';

interface EmployeeTableProps {
  employees: Employee[];
}

function EmployeeTable({ employees }: EmployeeTableProps) {
  if (employees.length === 0) {
    return (
      <p className="empty-message" role="status">
        No employees found.
      </p>
    );
  }

  return (
    <div className="table-container">
      <table>
        <caption className="sr-only">Employee directory</caption>

        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Department</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
