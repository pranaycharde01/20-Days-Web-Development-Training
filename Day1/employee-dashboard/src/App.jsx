
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
      <ul>
        {menuItems.map((item) => (
          <li
            key={item}
            className={activePage === item ? 'active' : ''}
            onClick={() => setActivePage(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </aside>
  )
}

function SummaryCard({ title, value, description }) {
  return (
    <div className="summary-card">
      <p>{title}</p>
      <h2>{value}</h2>
      <small>{description}</small>
    </div>
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
      <p className="page-description">Here's what's happening in your organization.</p>

      <div className="summary-container">
        <SummaryCard title="Total Employees" value={employees.length} description="Registered employees" />
        <SummaryCard title="Active Tasks" value={activeTasks} description="Tasks in progress" />
        <SummaryCard title="Completed Tasks" value={completedTasks} description="Successfully completed" />
      </div>

      <section className="content-card">
        <h2>Recent Employees</h2>
        {employees.slice(0, 5).map((employee) => (
          <div className="employee-row" key={employee.id}>
            <div>
              <h4>{employee.name}</h4>
              <p>{employee.role}</p>
            </div>
            <span>{employee.department}</span>
          </div>
        ))}
        {employees.length === 0 && <p>No employees found.</p>}
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

  const filteredEmployees = employees.filter((employee) =>
    `${employee.name} ${employee.role} ${employee.department}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  function resetForm() {
    setName('')
    setRole('')
    setEmail('')
    setDepartment('')
    setEditingId(null)
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!name.trim() || !role.trim() || !email.trim() || !department.trim()) {
      alert('Please fill in all fields.')
      return
    }

    if (editingId !== null) {
      setEmployees((current) =>
        current.map((employee) =>
          employee.id === editingId
            ? { ...employee, name, role, email, department }
            : employee
        )
      )
    } else {
      setEmployees((current) => [
        ...current,
        { id: Date.now(), name, role, email, department },
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
  }

  function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees((current) =>
        current.filter((employee) => employee.id !== id)
      )
    }
  }

  return (
    <main className="dashboard">
      <h1>Employee Management</h1>
      <p className="page-description">Add, search, edit and manage employees.</p>

      <section className="content-card">
        <h2>{editingId !== null ? 'Edit Employee' : 'Add New Employee'}</h2>

        <form className="employee-form" onSubmit={handleSubmit}>
          <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
          <input placeholder="Job role" value={role} onChange={(e) => setRole(e.target.value)} />
          <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />

          <button type="submit">{editingId !== null ? 'Update Employee' : 'Add Employee'}</button>

          {editingId !== null && (
            <button type="button" className="secondary-button" onClick={resetForm}>
              Cancel
            </button>
          )}
        </form>
      </section>

      <section className="content-card">
        <h2>All Employees ({filteredEmployees.length})</h2>

        <input
          className="search-input"
          placeholder="Search by name, role or department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filteredEmployees.map((employee) => (
          <div className="employee-row" key={employee.id}>
            <div>
              <h4>{employee.name}</h4>
              <p>{employee.role} | {employee.email}</p>
              <small>{employee.department}</small>
            </div>

            <div className="action-buttons">
              <button onClick={() => handleEdit(employee)}>Edit</button>
              <button className="delete-button" onClick={() => handleDelete(employee.id)}>Delete</button>
            </div>
          </div>
        ))}

        {filteredEmployees.length === 0 && <p>No matching employees found.</p>}
      </section>
    </main>
  )
}

function Tasks({ tasks, setTasks }) {
  const [title, setTitle] = useState('')
  const [employee, setEmployee] = useState('')

  function addTask(event) {
    event.preventDefault()

    if (!title.trim() || !employee.trim()) {
      alert('Please enter a task and employee name.')
      return
    }

    setTasks((current) => [
      ...current,
      { id: Date.now(), title, employee, status: 'Pending' },
    ])

    setTitle('')
    setEmployee('')
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
      <p className="page-description">Create tasks and track their progress.</p>

      <section className="content-card">
        <h2>Add New Task</h2>
        <form className="employee-form" onSubmit={addTask}>
          <input placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input placeholder="Assigned employee" value={employee} onChange={(e) => setEmployee(e.target.value)} />
          <button type="submit">Add Task</button>
        </form>
      </section>

      <section className="content-card">
        <h2>All Tasks ({tasks.length})</h2>

        {tasks.map((task) => (
          <div className="employee-row" key={task.id}>
            <div>
              <h4>{task.title}</h4>
              <p>Assigned to: {task.employee}</p>
              <select
                value={task.status}
                onChange={(e) => updateStatus(task.id, e.target.value)}
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>

            <button className="delete-button" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </div>
        ))}

        {tasks.length === 0 && <p>No tasks available.</p>}
      </section>
    </main>
  )
}

function Settings() {
  return (
    <main className="dashboard">
      <h1>Settings</h1>
      <p className="page-description">Application information and preferences.</p>

      <section className="content-card">
        <h2>Application Details</h2>
        <p>Employee Management Dashboard</p>
        <p>Version: 1.0.0</p>
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
        <Sidebar activePage={activePage} setActivePage={setActivePage} />

        {activePage === 'Dashboard' && (
          <Dashboard employees={employees} tasks={tasks} />
        )}

        {activePage === 'Employees' && (
          <Employees employees={employees} setEmployees={setEmployees} />
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
