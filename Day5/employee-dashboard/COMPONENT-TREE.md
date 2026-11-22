# Employee Management Dashboard

## Day 5 – Component Tree and Design Decisions

### 1. Application Structure

```text
Employee Management Dashboard
│
└── App
    │
    ├── Header
    │
    ├── Sidebar Navigation
    │   ├── Dashboard Button
    │   ├── Employees Button
    │   ├── Tasks Button
    │   └── Settings Button
    │
    ├── Dashboard
    │   ├── Summary Cards
    │   │   ├── Total Employees
    │   │   ├── Active Tasks
    │   │   └── Completed Tasks
    │   └── Recent Employees
    │
    ├── Employees
    │   ├── Employee Form
    │   │   ├── Name Input
    │   │   ├── Email Input
    │   │   ├── Role Input
    │   │   └── Department Input
    │   ├── Search Employees
    │   ├── Validation Messages
    │   └── Employee List
    │       ├── Edit Employee
    │       └── Delete Employee
    │
    ├── Tasks
    │   ├── Add Task Form
    │   ├── Search Tasks
    │   ├── Filter by Status
    │   └── Task List
    │       ├── Update Task Status
    │       └── Delete Task
    │
    └── Settings
```

### 2. Concepts Used

1. **React Components:** Organized the dashboard into reusable UI components.
2. **Props:** Passed data and functions between components.
3. **State Management:** Used React Hooks to manage employee and task data.
4. **Event Handling:** Managed clicks, form submissions, search, and filtering.
5. **Conditional Rendering:** Displayed content based on the current application state.
6. **Form Validation:** Checked required fields, email format, and duplicate email addresses.
7. **Accessibility:** Used semantic HTML, form labels, and keyboard focus styles.
8. **Responsive Design:** Used CSS media queries to support different screen sizes.

### 3. Design Decisions

- Kept the interface simple and easy to navigate.
- Used consistent styling across the dashboard.
- Added inline validation messages instead of browser alerts.
- Added search and filtering to improve usability.
- Used clear navigation buttons.
- Improved keyboard accessibility.
- Added responsive layouts for desktop and mobile devices.

### 4. Technology Stack

- React.js
- JavaScript
- HTML5
- CSS3
- Vite
