# Day 7 – Next.js Data Fetching and UI States

## Project Overview
A Next.js application demonstrating server-side and client-side data fetching using the JSONPlaceholder API.

The application displays a list of users, individual user details, and handles loading, empty, error, and not-found states.

## Technologies Used
- Next.js 16
- React
- TypeScript
- Tailwind CSS
- JSONPlaceholder REST API

## Features

### 1. Server-Side Data Fetching
- Fetches users inside an asynchronous Server Component.
- Displays users on the server-rendered page.
- Uses a separate function to fetch individual user details.

### 2. Client-Side Data Fetching
- Fetches users inside the browser using `useEffect`.
- Uses `useState` to manage users, loading, and error states.
- Provides a retry button when fetching fails.

### 3. Dynamic User Details
- Displays individual user information using dynamic routes.
- Uses the user ID from the URL.
- Handles invalid or unavailable user IDs with a custom not-found page.

### 4. UI State Handling
- `loading.tsx`: Displays a loading skeleton.
- `error.tsx`: Displays an error message and retry option.
- `not-found.tsx`: Displays a custom 404 page.
- Empty state: Displays a message when no users are available.

## Application Routes

| Route | Description |
|---|---|
| `/users` | Server-side user directory |
| `/users/[id]` | Individual user details |
| `/client-users` | Client-side user directory |

## Caching and Revalidation

The server-side fetch functions currently use:

`cache: "no-store"`

This means the response is not stored in the Next.js Data Cache and a fresh request is made.

Next.js also supports time-based revalidation:

`next: { revalidate: 60 }`

This allows cached data to be refreshed after 60 seconds.

## Rendering Approaches

- Server-side fetching: Data is fetched in an asynchronous Server Component.
- Client-side fetching: Data is fetched in a Client Component using `useEffect`.
- Static rendering: Pages can be generated during the build.
- Dynamic rendering: Pages can be rendered on demand.

## How to Run the Project

1. Install dependencies:

   `npm install`

2. Start the development server:

   `npm run dev`

3. Open:

   `http://localhost:3000/users`

## Testing

Run ESLint:

`npm run lint`

Create a production build:

`npm run build`

Both commands completed successfully.

## Learning Outcome

- Understand server-side and client-side data fetching.
- Understand dynamic routes in Next.js.
- Handle loading, empty, error, and not-found states.
- Understand caching and revalidation concepts.
- Choose an appropriate rendering approach.

