
import { useMemo, useState, type FormEvent, type ChangeEvent } from 'react';
import Button from './components/Button';
import TextInput from './components/TextInput';
import EmployeeTable from './components/EmployeeTable';
import type { Employee, EmployeeFormData } from './types';
import './App.css';

const initialEmployees: Employee[] = [
  {
    id: 1,
    name: 'Aarav Sharma',
    email: 'aarav@example.com',
    department: 'Engineering',
  },
  {
    id: 2,
    name: 'Priya Patel',
    email: 'priya@example.com',
    department: 'Human Resources',
  },
  {
    id: 3,
    name: 'Rahul Verma',
    email: 'rahul@example.com',
    department: 'Marketing',
  },
];

const emptyForm: EmployeeFormData = {
  name: '',
  email: '',
  department: '',
};

function App() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [formData, setFormData] = useState<EmployeeFormData>(emptyForm);
  const [search, setSearch] = useState('');
  const [errors, setErrors] = useState<Partial<EmployeeFormData>>({});
  const [successMessage, setSuccessMessage] = useState('');

  const filteredEmployees = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return employees.filter((employee) =>
      employee.name.toLowerCase().includes(searchTerm) ||
      employee.department.toLowerCase().includes(searchTerm)
    );
  }, [employees, search]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: '',
    }));

    setSuccessMessage('');
  }

  function validateForm(): boolean {
    const newErrors: Partial<EmployeeFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Enter a valid email address.';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccessMessage('');

    if (!validateForm()) {
      return;
    }

    const newEmployee: Employee = {
      id: Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      department: formData.department.trim(),
    };

    setEmployees((previous) => [...previous, newEmployee]);
    setFormData(emptyForm);
    setErrors({});
    setSuccessMessage('Employee added successfully!');
  }

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  return (
    <main className="app-container">
      <header className="page-header">
        <div>
          <p className="eyebrow">EMPLOYEE MANAGEMENT</p>
          <h1>Employee Directory</h1>
          <p className="subtitle">
            Manage your team and keep employee information organized.
          </p>
        </div>

        <div className="employee-count" aria-live="polite">
          <strong>{employees.length}</strong>
          <span>Total Employees</span>
        </div>
      </header>

      <section className="form-card" aria-labelledby="add-heading">
        <h2 id="add-heading">Add New Employee</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <TextInput
              label="Full Name"
              name="name"
              placeholder="Enter employee name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              autoComplete="name"
            />

            <TextInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              autoComplete="email"
            />

            <TextInput
              label="Department"
              name="department"
              placeholder="Enter department"
              value={formData.department}
              onChange={handleChange}
              error={errors.department}
            />
          </div>

          <div className="form-actions">
            <Button type="submit">Add Employee</Button>

            <Button
              variant="secondary"
              onClick={() => {
                setFormData(emptyForm);
                setErrors({});
                setSuccessMessage('');
              }}
            >
              Clear Form
            </Button>
          </div>
        </form>

        {successMessage && (
          <p className="success-message" role="status">
            {successMessage}
          </p>
        )}
      </section>

      <section className="directory-card" aria-labelledby="directory-heading">
        <div className="directory-header">
          <div>
            <h2 id="directory-heading">Employee List</h2>
            <p>Search employees by name or department.</p>
          </div>

          <span className="result-count" aria-live="polite">
            {filteredEmployees.length} results
          </span>
        </div>

        <div className="search-container">
          <TextInput
            label="Search Employees"
            name="search"
            placeholder="Search by name or department..."
            value={search}
            onChange={handleSearchChange}
          />

          {search && (
            <Button
              variant="secondary"
              onClick={() => setSearch('')}
            >
              Clear Search
            </Button>
          )}
        </div>

        <EmployeeTable employees={filteredEmployees} />
      </section>

      <footer className="page-footer">
        Built with React, TypeScript and reusable components.
      </footer>
    </main>
  );
}

export default App;
