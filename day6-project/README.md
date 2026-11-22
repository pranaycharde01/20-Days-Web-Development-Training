
# Day 6 - Employee Management System

A multi-page Employee Management System built using Next.js, React, TypeScript, and Tailwind CSS.

## Project Overview

This project was developed as part of the 20-Day Web Development Training Program.

The main objective is to understand the Next.js App Router, shared layouts, nested routes, dynamic routes, and Server and Client Components.

## Features

- Employee management dashboard
- Employee directory
- Search employees by name or department
- Add Employee form with validation
- Dynamic employee details pages
- Settings page
- Shared navigation, header, and footer
- Responsive user interface

## Technologies Used

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- ESLint

## Project Structure

```text
day6-project/
├── src/
│   └── app/
│       ├── employees/
│       │   ├── [id]/
│       │   │   └── page.tsx
│       │   ├── add/
│       │   │   └── page.tsx
│       │   └── page.tsx
│       ├── settings/
│       │   └── page.tsx
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
├── public/
├── package.json
└── README.md
```

## Application Routes

| Route | Description |
|---|---|
| `/` | Dashboard |
| `/employees` | Employee directory |
| `/employees/add` | Add employee form |
| `/employees/[id]` | Employee details |
| `/settings` | Application settings |

## Getting Started

Clone the repository:

```bash
git clone https://github.com/pranaycharde01/20-Days-Web-Development-Training.git
```

Navigate to the project:

```bash
cd 20-Days-Web-Development-Training/day6-project
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Available Commands

```bash
npm run dev
npm run build
npm run lint
npm run start
```

## Learning Outcomes

- Understanding Next.js App Router.
- Creating shared layouts using `layout.tsx`.
- Building pages using `page.tsx`.
- Implementing nested and dynamic routes.
- Understanding Server Components and Client Components.
- Building a multi-page application.

## Important Note

This project uses sample employee data. Employee additions are currently demonstrated through form validation and a success message; permanent employee storage is not implemented.

## Author

Pranay Charde

GitHub: https://github.com/pranaycharde01
