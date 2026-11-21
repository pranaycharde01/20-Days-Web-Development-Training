
import { useEffect, useState } from 'react'
import './App.css'

const API_URL = 'https://jsonplaceholder.typicode.com/users'

function App() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryCount, setRetryCount] = useState(0)
  const [searchError, setSearchError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchUsers() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(API_URL, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Unable to load users. Please try again.')
        }

        const data = await response.json()

        if (!Array.isArray(data)) {
          throw new Error('Invalid data received from server.')
        }

        setUsers(data)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Something went wrong.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchUsers()

    return () => {
      controller.abort()
    }
  }, [retryCount])

  function handleSearch(event) {
    event.preventDefault()

    if (search.trim().length > 50) {
      setSearchError('Search cannot exceed 50 characters.')
      return
    }

    setSearchError('')
  }

  function handleSearchChange(event) {
    const value = event.target.value
    setSearch(value)

    if (value.length <= 50) {
      setSearchError('')
    }
  }

  function handleRetry() {
    setRetryCount((count) => count + 1)
  }

  const filteredUsers = users.filter((user) => {
    const searchValue = search.trim().toLowerCase()

    return (
      user.name.toLowerCase().includes(searchValue) ||
      user.email.toLowerCase().includes(searchValue) ||
      user.company.name.toLowerCase().includes(searchValue)
    )
  })

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>User Directory</h1>
          <p>Find and explore user information</p>
        </div>
      </header>

      <main className="container">
        <section className="search-section">
          <h2>Search Users</h2>
          <p>Search by name, email or company name.</p>

          <form onSubmit={handleSearch} className="search-form">
            <input
              type="search"
              placeholder="Enter name, email or company..."
              value={search}
              onChange={handleSearchChange}
              maxLength={50}
              aria-label="Search users"
            />

            <button type="submit">Search</button>

            <button
              type="button"
              className="clear-button"
              onClick={() => {
                setSearch('')
                setSearchError('')
              }}
            >
              Clear
            </button>
          </form>

          {searchError && (
            <p className="search-error">{searchError}</p>
          )}
        </section>

        <section className="results-section">
          <div className="results-heading">
            <h2>All Users</h2>

            {!loading && !error && (
              <span>{filteredUsers.length} users found</span>
            )}
          </div>

          {loading && (
            <div className="state-message">
              <div className="loader"></div>
              <p>Loading users...</p>
            </div>
          )}

          {!loading && error && (
            <div className="state-message error-state">
              <h3>Something went wrong</h3>
              <p>{error}</p>
              <button onClick={handleRetry}>Try Again</button>
            </div>
          )}

          {!loading && !error && filteredUsers.length === 0 && (
            <div className="state-message">
              <h3>No users found</h3>
              <p>Try another name, email or company.</p>
              <button
                className="clear-button"
                onClick={() => setSearch('')}
              >
                Clear Search
              </button>
            </div>
          )}

          {!loading && !error && filteredUsers.length > 0 && (
            <div className="user-grid">
              {filteredUsers.map((user) => (
                <article className="user-card" key={user.id}>
                  <div className="user-avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="user-details">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    <p>{user.company.name}</p>
                    <p>{user.address.city}</p>
                    <p>{user.phone}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>Day 2 Training Project | React + Vite</p>
      </footer>
    </div>
  )
}

export default App
