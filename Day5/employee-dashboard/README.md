# Day 5 – Employee Management Dashboard

## Project Overview

The Employee Management Dashboard is a responsive React application developed as a Day 5 front-end checkpoint project.

The project focuses on improving the user interface, form validation, accessibility, responsive design, and code organization.

## Features

### Dashboard
- Summary cards displaying employee and task information.
- Recent employee information.

### Employee Management
- View employee details.
- Add new employees.
- Edit existing employee details.
- Delete employees.
- Search employees by name, role, department, and email.
- Form validation.
- Duplicate email validation.

### Task Management
- Add new tasks.
- Search tasks.
- Filter tasks by status.
- Update task status.
- Delete tasks.

### Additional Features
- Sidebar navigation.
- Settings section.
- Responsive layout for different screen sizes.
- Accessible form labels and navigation.
- Inline validation and status messages.
- Keyboard focus styles.

## Technologies Used

- React.js
- JavaScript
- HTML5
- CSS3
- Vite

## React Concepts Practiced

1. **Components:** Organized the application using reusable UI components.
2. **State Management:** Used React Hooks to manage employees, tasks, and form data.
3. **Event Handling:** Implemented form submissions, search, filtering, editing, and deletion.
4. **Conditional Rendering:** Displayed different messages and content based on application state.
5. **Form Validation:** Added required-field, email-format, and duplicate-email checks.

## Accessibility and Responsive Design

- Used semantic HTML elements.
- Added labels for form fields.
- Included accessible navigation indicators.
- Added visible keyboard focus styles.
- Designed responsive layouts for smaller screens.
- Used inline error and status messages.

## Design Decisions

- Kept the dashboard layout simple and easy to navigate.
- Used reusable UI patterns to maintain consistency.
- Added search and filters to make employee and task management easier.
- Used inline validation instead of browser alerts.
- Used responsive CSS so the application works on desktop and mobile screens.

## Installation and Setup

1. Clone or download the repository.
2. Open the project folder in VS Code.
3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL displayed in the terminal.

## Production Build

Run the following command to check the production build:

```bash
npm run build
```

## Important Note

This project currently uses React state for application data. Employee and task changes are not permanently stored in a database.

## Training Details

- **Training:** 20-Day Web Development Internship Training
- **Day:** 5
- **Project:** Employee Management Dashboard
- **Status:** Completed
- **Stack:** React, JavaScript, HTML, CSS, and Vite