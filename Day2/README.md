
# Day 2 - Searchable User Directory

## Project Description

A searchable user directory built using React and Vite. It fetches user information from a public API and allows users to search by name, email, or company.

## Features

- Fetch users from a public REST API.
- Search users by name.
- Search users by email.
- Search users by company.
- Controlled search input using React state.
- Search input validation.
- Loading spinner while fetching data.
- Error message when API requests fail.
- Retry button to fetch data again.
- Empty state when no users match.
- Clear search functionality.
- Responsive user cards.

## Technologies Used

- React
- JavaScript
- CSS
- Vite
- HTML
- JSONPlaceholder API

## API Used

https://jsonplaceholder.typicode.com/users

## React Concepts Learned

1. useState
2. useEffect
3. Controlled Components
4. Form Handling
5. API Fetching
6. Error Handling
7. Conditional Rendering
8. Array map()
9. Array filter()
10. AbortController and cleanup

## How to Run the Project

1. Clone or download the project.
2. Open the project folder in VS Code.
3. Install dependencies:

   npm install

4. Start the development server:

   npm run dev

5. Open the local URL shown in the terminal.

## Project Structure

Day2/
├── public/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── README.md

## Learning Outcome

Learned how to manage user input, fetch API data, handle asynchronous states, implement search functionality, and clean up API requests using React.
