# Day 4 – Employee Directory & Management

## Project Overview

A responsive Employee Management application built using React and TypeScript. It allows users to add employees, search employee records, and validate form data.

## Features

- Display employee records in a reusable table.
- Add new employees.
- Validate required form fields.
- Validate email addresses.
- Search employees by name.
- Search employees by department.
- Display a message when no employees match the search.
- Clear the form and search input.
- Reusable Button, TextInput, and EmployeeTable components.
- Accessible labels, error messages, and status announcements.
- Responsive user interface.

## Technologies Used

- React
- TypeScript
- Vite
- CSS
- Vitest
- React Testing Library
- User Event
- jsdom

## Project Structure

```text
Day4/
├── src/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── TextInput.tsx
│   │   └── EmployeeTable.tsx
│   ├── test/
│   │   └── setup.ts
│   ├── App.tsx
│   ├── App.css
│   ├── App.test.tsx
│   ├── index.css
│   ├── main.tsx
│   └── types.ts
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Installation

Install project dependencies:

```bash
npm install
```

## Run the Application

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

## Run Tests

Run tests in watch mode:

```bash
npm run test
```

Run all tests once:

```bash
npm run test:run
```

## Production Build

```bash
npm run build
```

## Testing Results

All 6 automated tests passed successfully:

1. Empty form validation.
2. Invalid email validation.
3. Adding an employee with valid details.
4. Filtering employees by name.
5. Filtering employees by department.
6. Displaying an empty result message.

Production build completed successfully without errors.

## Learning Outcomes

- Created reusable React components.
- Used TypeScript interfaces and props.
- Practiced form validation.
- Implemented accessible form controls.
- Learned component testing with Vitest and React Testing Library.
- Tested user interactions and search filtering.

## Day 4 Status

Completed – Reusable UI Components and Front-End Testing.
