
import { useEffect, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import type { LoadingStatus, User, UsersResponse } from './types'
import './App.css'

// Typed props for the UserCard component
interface UserCardProps {
  user: User
}

// Reusable User Card Component
function UserCard({ user }: UserCardProps) {
  return (
    <article className="user-card">
      <div className="user-avatar">
        {user.name.charAt(0).toUpperCase()}
      </div>

      <div className="user-info">
        <h3>{user.name}</h3>
        <p className="username">@{user.username}</p>

        <div className="user-detail">
          <span>✉</span>
          <a href={`mailto:${user.email}`}>{user.email}</a>
        </div>

        <div className="user-detail">
          <span>☎</span>
          <span>{user.phone}</span>
        </div>

        <div className="user-detail">
          <span>⌂</span>
          <span>{user.address.city}</span>
        </div>

        <div className="company-info">
          <strong>{user.company.name}</strong>
          <p>{user.company.catchPhrase}</p>
        </div>

        <a
          className="website-link"
          href={`https://${user.website}`}
          target="_blank"
          rel="noreferrer"
        >
          Visit Website ↗
        </a>
      </div>
    </article>
  )
}

// Main Application Component
function App() {
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState<string>('')
  const [status, setStatus] = useState<LoadingStatus>('loading')
  const [error, setError] = useState<string>('')
  const [searchError, setSearchError] = useState<string>('')
  const [retryCount, setRetryCount] = useState<number>(0)

  // Fetch users from API
  useEffect(() => {
    const controller = new AbortController()

    async function fetchUsers(): Promise<void> {
      try {
        setStatus('loading')
        setError('')

        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users',
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error('Unable to fetch users. Please try again.')
        }

        const data: UsersResponse = await response.json()

        if (!Array.isArray(data)) {
          throw new Error('Invalid user data received from the server.')
        }

        setUsers(data)
        setStatus('success')
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') {
          return
        }

        const message =
          err instanceof Error
            ? err.message
            : 'Something went wrong.'

        setError(message)
        setStatus('error')
      }
    }

    void fetchUsers()

    return () => {
      controller.abort()
    }
  }, [retryCount])

  // Handle search input changes
  function handleSearchChange(
    event: ChangeEvent<HTMLInputElement>
  ): void {
    const value = event.target.value

    setSearch(value)

    if (value.length > 50) {
      setSearchError('Search cannot exceed 50 characters.')
    } else {
      setSearchError('')
    }
  }

  // Handle form submission
  function handleSearch(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    if (search.trim().length > 50) {
      setSearchError('Search cannot exceed 50 characters.')
      return
    }

    setSearchError('')
  }

  // Clear search
  function handleClear(): void {
    setSearch('')
    setSearchError('')
  }

  // Retry API request
  function handleRetry(): void {
    setRetryCount((previousCount) => previousCount + 1)
  }

  // Filter users by name, email, or company
  const filteredUsers = users.filter((user) => {
    const searchTerm = search.trim().toLowerCase()

    return (
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.company.name.toLowerCase().includes(searchTerm)
    )
  })

  return (
    <main className="app-container">
      <header className="app-header">
        <div className="header-content">
          <p className="eyebrow">DAY 3 · TYPESCRIPT PROJECT</p>
          <h1>User Directory</h1>
          <p className="header-description">
            Find people, explore their details, and discover their companies.
          </p>
        </div>
      </header>

      <section className="directory-section">
        <div className="section-heading">
          <div>
            <h2>All Users</h2>
            <p>Search through our user directory.</p>
          </div>

          {status === 'success' && (
            <span className="total-count">
              {filteredUsers.length} of {users.length} users
            </span>
          )}
        </div>

        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-input-wrapper">
            <span className="search-icon">⌕</span>

            <input
              type="text"
              placeholder="Search by name, email, or company..."
              value={search}
              onChange={handleSearchChange}
              maxLength={50}
              aria-label="Search users"
            />

            {search && (
              <button
                type="button"
                className="clear-button"
                onClick={handleClear}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        {searchError && (
          <p className="validation-message">{searchError}</p>
        )}

        {status === 'loading' && (
          <div className="state-message">
            <div className="spinner"></div>
            <h3>Loading users...</h3>
            <p>Please wait while we fetch user information.</p>
          </div>
        )}

        {status === 'error' && (
          <div className="state-message error-state">
            <div className="state-icon">!</div>
            <h3>Something went wrong</h3>
            <p>{error}</p>
            <button
              type="button"
              className="retry-button"
              onClick={handleRetry}
            >
              Try Again
            </button>
          </div>
        )}

        {status === 'success' && filteredUsers.length === 0 && (
          <div className="state-message">
            <div className="state-icon">⌕</div>
            <h3>No users found</h3>
            <p>Try searching with another name, email, or company.</p>
            <button
              type="button"
              className="retry-button"
              onClick={handleClear}
            >
              Clear Search
            </button>
          </div>
        )}

        {status === 'success' && filteredUsers.length > 0 && (
          <div className="users-grid">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </section>

      <footer className="app-footer">
        <p>Built with React, TypeScript, and JSONPlaceholder API.</p>
      </footer>
    </main>
  )
}

export default App
