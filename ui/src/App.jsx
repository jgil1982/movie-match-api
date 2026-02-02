import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'http://localhost:3000/movies'

function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ title: '', year: '', rating: '', poster: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchMovies()
  }, [])

  async function fetchMovies() {
    try {
      const res = await fetch(API_URL)
      const json = await res.json()
      if (json.success) {
        setMovies(json.data)
      }
    } catch (error) {
      console.error('Error fetching movies:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          year: parseInt(form.year),
          rating: parseFloat(form.rating),
          poster: form.poster || null
        })
      })

      const json = await res.json()
      if (json.success) {
        setMovies([...movies, json.data[0]])
        setForm({ title: '', year: '', rating: '', poster: '' })
      }
    } catch (error) {
      console.error('Error creating movie:', error)
    } finally {
      setSubmitting(false)
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <div className="app">
      <header>
        <h1>Movie Match</h1>
      </header>

      <section className="form-section">
        <h2>Agregar Pelicula</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Titulo"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="year"
            placeholder="Ano"
            value={form.year}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating (0-10)"
            step="0.1"
            min="0"
            max="10"
            value={form.rating}
            onChange={handleChange}
            required
          />
          <input
            type="url"
            name="poster"
            placeholder="URL del Poster (opcional)"
            value={form.poster}
            onChange={handleChange}
          />
          <button type="submit" disabled={submitting}>
            {submitting ? 'Guardando...' : 'Agregar'}
          </button>
        </form>
      </section>

      <section className="movies-section">
        <h2>Peliculas ({movies.length})</h2>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div className="movies-grid">
            {movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <div className="poster">
                  {movie.poster ? (
                    <img src={movie.poster} alt={movie.title} />
                  ) : (
                    <div className="no-poster">Sin Poster</div>
                  )}
                </div>
                <div className="info">
                  <h3>{movie.title}</h3>
                  <p className="year">{movie.year}</p>
                  <p className="rating">* {movie.rating}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default App
