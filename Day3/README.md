
# Day 3 - TypeScript Essentials

## Project: Searchable User Directory

A responsive user directory built using React, TypeScript, and the JSONPlaceholder API.

## Features

- Fetch users from an external API.
- Search users by name, email, or company.
- Display user contact information.
- Display company and address information.
- Reusable UserCard component.
- TypeScript interfaces and type aliases.
- Typed component props.
- Typed form and input events.
- Typed API response.
- Loading state and spinner.
- Error handling and retry functionality.
- Empty search results message.
- Clear search functionality.
- Responsive design.

## Technologies Used

- React
- TypeScript
- Vite
- HTML5
- CSS3
- JSONPlaceholder API

## TypeScript Concepts Practiced

### 1. Primitive Types

Used string and number types for user information.

### 2. Interfaces

Created interfaces for:

- User
- Company
- Address
- SearchForm
- UserCardProps

### 3. Type Aliases

Created aliases for:

- UserId
- UserName
- UserEmail
- UsersResponse
- LoadingStatus

### 4. Union Types

Used LoadingStatus to represent:

- idle
- loading
- success
- error

### 5. Typed React Props

Used UserCardProps to define the UserCard component properties.

### 6. Typed Events

Used:

- ChangeEvent<HTMLInputElement>
- FormEvent<HTMLFormElement>

### 7. Typed API Responses

Used UsersResponse to describe the API response.

## API Used

https://jsonplaceholder.typicode.com/users

## Installation and Setup

1. Clone or download the project.
2. Open the project folder in VS Code.
3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL shown in the terminal.

## Build

To check the production build:

```bash
npm run build
```

## Learning Outcome

Learned how to use TypeScript with React to make components, props, events, state, and API responses safer and easier to maintain.

## Training Day

Day 3 of the 20-Day Web Development Internship Training.
