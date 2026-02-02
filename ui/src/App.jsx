import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'http://localhost:3000/movies'

function App() {
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ title: '', year: '', rating: '', genre: '', poster: '' })
  const [filters, setFilters] = useState({ genre: '', minRating: '' })
  const [submitting, setSubmitting] = useState(false)

  // Estado para modal de reviews
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [reviewForm, setReviewForm] = useState({ author: '', rating: '5', comment: '' })
  const [submittingReview, setSubmittingReview] = useState(false)

  useEffect(() => {
    fetchGenres()
    fetchMovies()
  }, [])

  async function fetchGenres() {
    try {
      const res = await fetch(`${API_URL}/genres`)
      const json = await res.json()
      if (json.success) {
        setGenres(json.data)
      }
    } catch (error) {
      console.error('Error fetching genres:', error)
    }
  }

  async function fetchMovies(currentFilters = filters) {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (currentFilters.genre) params.append('genre', currentFilters.genre)
      if (currentFilters.minRating) params.append('minRating', currentFilters.minRating)

      const url = params.toString() ? `${API_URL}?${params}` : API_URL
      const res = await fetch(url)
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

  async function fetchMovieWithReviews(movieId) {
    try {
      const res = await fetch(`${API_URL}/${movieId}`)
      const json = await res.json()
      if (json.success && json.data.length > 0) {
        setSelectedMovie(json.data[0])
      }
    } catch (error) {
      console.error('Error fetching movie:', error)
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
          genre: form.genre,
          poster: form.poster || null
        })
      })

      const json = await res.json()
      if (json.success) {
        setForm({ title: '', year: '', rating: '', genre: '', poster: '' })
        fetchMovies()
      }
    } catch (error) {
      console.error('Error creating movie:', error)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleSubmitReview(e) {
    e.preventDefault()
    if (!selectedMovie) return

    setSubmittingReview(true)
    try {
      const res = await fetch(`${API_URL}/${selectedMovie.id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: reviewForm.author,
          rating: parseInt(reviewForm.rating),
          comment: reviewForm.comment
        })
      })

      const json = await res.json()
      if (json.success) {
        // Actualizar reviews en el modal sin recargar
        setSelectedMovie({
          ...selectedMovie,
          reviews: [json.data, ...(selectedMovie.reviews || [])]
        })
        setReviewForm({ author: '', rating: '5', comment: '' })
      }
    } catch (error) {
      console.error('Error creating review:', error)
    } finally {
      setSubmittingReview(false)
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleReviewChange(e) {
    setReviewForm({ ...reviewForm, [e.target.name]: e.target.value })
  }

  function handleFilterChange(e) {
    const newFilters = { ...filters, [e.target.name]: e.target.value }
    setFilters(newFilters)
    fetchMovies(newFilters)
  }

  function clearFilters() {
    const emptyFilters = { genre: '', minRating: '' }
    setFilters(emptyFilters)
    fetchMovies(emptyFilters)
  }

  function openMovieModal(movie) {
    fetchMovieWithReviews(movie.id)
  }

  function closeModal() {
    setSelectedMovie(null)
    setReviewForm({ author: '', rating: '5', comment: '' })
  }

  function renderStars(rating) {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  const hasActiveFilters = filters.genre || filters.minRating

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
          <select
            name="genre"
            value={form.genre}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar genero</option>
            {genres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
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

      <section className="filters-section">
        <h2>Filtros</h2>
        <div className="filters">
          <select
            name="genre"
            value={filters.genre}
            onChange={handleFilterChange}
          >
            <option value="">Todos los generos</option>
            {genres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          <select
            name="minRating"
            value={filters.minRating}
            onChange={handleFilterChange}
          >
            <option value="">Cualquier rating</option>
            <option value="7">7+</option>
            <option value="8">8+</option>
            <option value="9">9+</option>
          </select>
          {hasActiveFilters && (
            <button type="button" onClick={clearFilters} className="clear-btn">
              Limpiar filtros
            </button>
          )}
        </div>
      </section>

      <section className="movies-section">
        <h2>Peliculas ({movies.length})</h2>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div className="movies-grid">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="movie-card"
                onClick={() => openMovieModal(movie)}
              >
                <div className="poster">
                  {movie.poster ? (
                    <img src={movie.poster} alt={movie.title} />
                  ) : (
                    <div className="no-poster">Sin Poster</div>
                  )}
                </div>
                <div className="info">
                  <h3>{movie.title}</h3>
                  <span className="genre-badge">{movie.genre}</span>
                  <p className="year">{movie.year}</p>
                  <p className="rating">* {movie.rating}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modal de detalle con reviews */}
      {selectedMovie && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>X</button>

            <div className="modal-movie-info">
              <div className="modal-poster">
                {selectedMovie.poster ? (
                  <img src={selectedMovie.poster} alt={selectedMovie.title} />
                ) : (
                  <div className="no-poster">Sin Poster</div>
                )}
              </div>
              <div className="modal-details">
                <h2>{selectedMovie.title}</h2>
                <span className="genre-badge">{selectedMovie.genre}</span>
                <p className="year">{selectedMovie.year}</p>
                <p className="rating">Rating: {selectedMovie.rating}/10</p>
              </div>
            </div>

            <div className="reviews-section">
              <h3>Reviews ({selectedMovie.reviews?.length || 0})</h3>

              {/* Formulario para agregar review */}
              <form className="review-form" onSubmit={handleSubmitReview}>
                <input
                  type="text"
                  name="author"
                  placeholder="Tu nombre"
                  value={reviewForm.author}
                  onChange={handleReviewChange}
                  required
                />
                <select
                  name="rating"
                  value={reviewForm.rating}
                  onChange={handleReviewChange}
                  required
                >
                  <option value="5">5 estrellas</option>
                  <option value="4">4 estrellas</option>
                  <option value="3">3 estrellas</option>
                  <option value="2">2 estrellas</option>
                  <option value="1">1 estrella</option>
                </select>
                <textarea
                  name="comment"
                  placeholder="Tu comentario..."
                  value={reviewForm.comment}
                  onChange={handleReviewChange}
                  required
                  rows="3"
                />
                <button type="submit" disabled={submittingReview}>
                  {submittingReview ? 'Enviando...' : 'Agregar Review'}
                </button>
              </form>

              {/* Lista de reviews */}
              <div className="reviews-list">
                {selectedMovie.reviews && selectedMovie.reviews.length > 0 ? (
                  selectedMovie.reviews.map((review) => (
                    <div key={review.id} className="review-card">
                      <div className="review-header">
                        <span className="review-author">{review.author}</span>
                        <span className="review-stars">{renderStars(review.rating)}</span>
                      </div>
                      <p className="review-comment">{review.comment}</p>
                      <span className="review-date">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="no-reviews">No hay reviews todavia. Se el primero en opinar!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
