
import { useState } from 'react'
import './App.css'

const initialEmployees = [
  { id: 1, name: 'Rahul Sharma', role: 'Frontend Developer', email: 'rahul@example.com', department: 'Development' },
  { id: 2, name: 'Priya Patil', role: 'Backend Developer', email: 'priya@example.com', department: 'Development' },
  { id: 3, name: 'Amit Verma', role: 'UI Designer', email: 'amit@example.com', department: 'Design' },
]

const initialTasks = [
  { id: 1, title: 'Design dashboard interface', employee: 'Amit Verma', status: 'Completed' },
  { id: 2, title: 'Develop employee page', employee: 'Rahul Sharma', status: 'In Progress' },
  { id: 3, title: 'Create API integration', employee: 'Priya Patil', status: 'Pending' },
]

function Header() {
  return (
    <header className="header">
      <h2>Employee Dashboard</h2>
      <span>Welcome back!</span>
    </header>
  )
}

function Sidebar({ activePage, setActivePage }) {
  const menuItems = ['Dashboard', 'Employees', 'Tasks', 'Settings']

  return (
    <aside className="sidebar">
      <h3>MAIN MENU</h3>
      <nav aria-label="Main navigation">
        <ul>
          {menuItems.map((item) => (
            <li key={item}>
              <button
                type="button"
                className={activePage === item ? 'active' : ''}
                aria-current={activePage === item ? 'page' : undefined}
                onClick={() => setActivePage(item)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

function SummaryCard({ title, value, description }) {
  return (
    <article className="summary-card">
      <p>{title}</p>
      <h2>{value}</h2>
      <small>{description}</small>
    </article>
  )
}

function Dashboard({ employees, tasks }) {
  const completedTasks = tasks.filter(
    (task) => task.status === 'Completed'
  ).length

  const activeTasks = tasks.filter(
    (task) => task.status === 'In Progress'
  ).length

  return (
    <main className="dashboard">
      <h1>Dashboard Overview</h1>
      <p className="page-description">
        Here's what's happening in your organization.
      </p>

      <div className="summary-container">
        <SummaryCard
          title="Total Employees"
          value={employees.length}
          description="Registered employees"
        />
        <SummaryCard
          title="Active Tasks"
          value={activeTasks}
          description="Tasks in progress"
        />
        <SummaryCard
          title="Completed Tasks"
          value={completedTasks}
          description="Successfully completed"
        />
      </div>

      <section className="content-card" aria-labelledby="recent-employees">
        <h2 id="recent-employees">Recent Employees</h2>

        {employees.length > 0 ? (
          employees.slice(0, 5).map((employee) => (
            <div className="employee-row" key={employee.id}>
              <div>
                <h4>{employee.name}</h4>
                <p>{employee.role}</p>
              </div>
              <span>{employee.department}</span>
            </div>
          ))
        ) : (
          <p role="status">No employees have been added yet.</p>
        )}
      </section>
    </main>
  )
}

function Employees({ employees, setEmployees }) {
  const [search, setSearch] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [email, setEmail] = useState('')
  const [department, setDepartment] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')

  const filteredEmployees = employees.filter((employee) =>
    `${employee.name} ${employee.role} ${employee.department} ${employee.email}`
      .toLowerCase()
      .includes(search.toLowerCase().trim())
  )

  function resetForm() {
    setName('')
    setRole('')
    setEmail('')
    setDepartment('')
    setEditingId(null)
    setError('')
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!name.trim() || !role.trim() || !email.trim() || !department.trim()) {
      setError('Please fill in all fields.')
      return
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!validEmail.test(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }

    const duplicateEmail = employees.some(
      (employee) =>
        employee.email.toLowerCase() === email.trim().toLowerCase() &&
        employee.id !== editingId
    )

    if (duplicateEmail) {
      setError('An employee with this email already exists.')
      return
    }

    const employeeData = {
      name: name.trim(),
      role: role.trim(),
      email: email.trim(),
      department: department.trim(),
    }

    if (editingId !== null) {
      setEmployees((current) =>
        current.map((employee) =>
          employee.id === editingId
            ? { ...employee, ...employeeData }
            : employee
        )
      )
    } else {
      setEmployees((current) => [
        ...current,
        { id: Date.now(), ...employeeData },
      ])
    }

    resetForm()
  }

  function handleEdit(employee) {
    setName(employee.name)
    setRole(employee.role)
    setEmail(employee.email)
    setDepartment(employee.department)
    setEditingId(employee.id)
    setError('')
  }

  function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees((current) =>
        current.filter((employee) => employee.id !== id)
      )

      if (editingId === id) {
        resetForm()
      }
    }
  }

  return (
    <main className="dashboard">
      <h1>Employee Management</h1>
      <p className="page-description">
        Add, search, edit and manage employees.
      </p>

      <section className="content-card" aria-labelledby="employee-form-title">
        <h2 id="employee-form-title">
          {editingId !== null ? 'Edit Employee' : 'Add New Employee'}
        </h2>

        <form className="employee-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="employee-name">Full Name</label>
          <input
            id="employee-name"
            placeholder="Enter full name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <label htmlFor="employee-role">Job Role</label>
          <input
            id="employee-role"
            placeholder="Enter job role"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            required
          />

          <label htmlFor="employee-email">Email Address</label>
          <input
            id="employee-email"
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="employee-department">Department</label>
          <input
            id="employee-department"
            placeholder="Enter department"
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
            required
          />

          {error && <p className="form-error" role="alert">{error}</p>}

          <button type="submit">
            {editingId !== null ? 'Update Employee' : 'Add Employee'}
          </button>

          {editingId !== null && (
            <button type="button" className="secondary-button" onClick={resetForm}>
              Cancel
            </button>
          )}
        </form>
      </section>

      <section className="content-card" aria-labelledby="all-employees-title">
        <h2 id="all-employees-title">
          All Employees ({filteredEmployees.length})
        </h2>

        <label htmlFor="employee-search">Search Employees</label>
        <input
          id="employee-search"
          className="search-input"
          placeholder="Search by name, role, department or email..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee) => (
            <div className="employee-row" key={employee.id}>
              <div>
                <h4>{employee.name}</h4>
                <p>{employee.role} | {employee.email}</p>
                <small>{employee.department}</small>
              </div>

              <div className="action-buttons">
                <button type="button" onClick={() => handleEdit(employee)}>
                  Edit
                </button>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => handleDelete(employee.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p role="status">
            {employees.length === 0
              ? 'No employees available. Add your first employee above.'
              : 'No matching employees found. Try another search.'}
          </p>
        )}
      </section>
    </main>
  )
}

function Tasks({ tasks, setTasks }) {
  const [title, setTitle] = useState('')
  const [employee, setEmployee] = useState('')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [error, setError] = useState('')

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = `${task.title} ${task.employee}`
      .toLowerCase()
      .includes(search.toLowerCase().trim())

    const matchesStatus =
      statusFilter === 'All' || task.status === statusFilter

    return matchesSearch && matchesStatus
  })

  function addTask(event) {
    event.preventDefault()

    if (!title.trim() || !employee.trim()) {
      setError('Please enter both task title and employee name.')
      return
    }

    setTasks((current) => [
      ...current,
      {
        id: Date.now(),
        title: title.trim(),
        employee: employee.trim(),
        status: 'Pending',
      },
    ])

    setTitle('')
    setEmployee('')
    setError('')
  }

  function updateStatus(id, status) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    )
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id))
  }

  return (
    <main className="dashboard">
      <h1>Task Management</h1>
      <p className="page-description">
        Create tasks and track their progress.
      </p>

      <section className="content-card" aria-labelledby="add-task-title">
        <h2 id="add-task-title">Add New Task</h2>

        <form className="employee-form" onSubmit={addTask} noValidate>
          <label htmlFor="task-title">Task Title</label>
          <input
            id="task-title"
            placeholder="Enter task title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />

          <label htmlFor="task-employee">Assigned Employee</label>
          <input
            id="task-employee"
            placeholder="Enter employee name"
            value={employee}
            onChange={(event) => setEmployee(event.target.value)}
            required
          />

          {error && <p className="form-error" role="alert">{error}</p>}

          <button type="submit">Add Task</button>
        </form>
      </section>

      <section className="content-card" aria-labelledby="all-tasks-title">
        <h2 id="all-tasks-title">All Tasks ({filteredTasks.length})</h2>

        <label htmlFor="task-search">Search Tasks</label>
        <input
          id="task-search"
          className="search-input"
          placeholder="Search task or employee..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <label htmlFor="task-status-filter">Filter by Status</label>
        <select
          id="task-status-filter"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div className="employee-row" key={task.id}>
              <div>
                <h4>{task.title}</h4>
                <p>Assigned to: {task.employee}</p>

                <label htmlFor={`task-status-${task.id}`}>
                  Task Status
                </label>
                <select
                  id={`task-status-${task.id}`}
                  value={task.status}
                  onChange={(event) =>
                    updateStatus(task.id, event.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <button
                type="button"
                className="delete-button"
                onClick={() => deleteTask(task.id)}
                aria-label={`Delete task: ${task.title}`}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p role="status">
            {tasks.length === 0
              ? 'No tasks available. Add your first task above.'
              : 'No matching tasks found.'}
          </p>
        )}
      </section>
    </main>
  )
}

function Settings() {
  return (
    <main className="dashboard">
      <h1>Settings</h1>
      <p className="page-description">
        Application information and preferences.
      </p>

      <section className="content-card">
        <h2>Application Details</h2>
        <p>Employee Management Dashboard</p>
        <p>Version: 2.0.0</p>
        <p>Built with React, JavaScript and CSS.</p>
      </section>
    </main>
  )
}

function App() {
  const [activePage, setActivePage] = useState('Dashboard')
  const [employees, setEmployees] = useState(initialEmployees)
  const [tasks, setTasks] = useState(initialTasks)

  return (
    <div className="app">
      <Header />

      <div className="main-layout">
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
        />

        {activePage === 'Dashboard' && (
          <Dashboard employees={employees} tasks={tasks} />
        )}

        {activePage === 'Employees' && (
          <Employees
            employees={employees}
            setEmployees={setEmployees}
          />
        )}

        {activePage === 'Tasks' && (
          <Tasks tasks={tasks} setTasks={setTasks} />
        )}

        {activePage === 'Settings' && <Settings />}
      </div>
    </div>
  )
}

export default App
