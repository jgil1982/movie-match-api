import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/stats`)
      .then(res => res.json())
      .then(data => {
        setStats(data.data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading) return <div style={{ padding: '2rem', color: 'white' }}>Cargando dashboard...</div>;

  return (
    <div style={{ padding: '2rem', background: '#1a1a1a', minHeight: '100vh', color: 'white' }}>
      <h1 style={{ marginBottom: '2rem' }}>🎬 Movie Match Dashboard</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <MetricCard label="Películas" value={stats.totalMovies} icon="🎬" />
        <MetricCard label="Reviews" value={stats.totalReviews} icon="📝" />
        <MetricCard label="Rating Promedio" value={stats.avgRating} icon="⭐" />
        <MetricCard label="Géneros" value={stats.moviesByGenre.length} icon="🎭" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{ background: '#2a2a2a', padding: '1.5rem', borderRadius: '8px' }}>
          <h3 style={{ marginTop: 0 }}>🏆 Top Películas</h3>
          {stats.topRated.map((movie, i) => (
            <div key={movie.id} style={{ padding: '0.75rem 0', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ marginRight: '1rem', color: '#888' }}>#{i + 1}</span>
                <strong>{movie.title}</strong>
                <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem', color: '#888' }}>({movie.genre})</span>
              </div>
              <span style={{ fontWeight: 'bold', color: '#2a9d8f' }}>⭐ {movie.rating}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#2a2a2a', padding: '1.5rem', borderRadius: '8px' }}>
          <h3 style={{ marginTop: 0 }}>💬 Más Comentadas</h3>
          {stats.mostReviewed.map((movie, i) => (
            <div key={movie.id} style={{ padding: '0.75rem 0', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ marginRight: '1rem', color: '#888' }}>#{i + 1}</span>
                <strong>{movie.title}</strong>
              </div>
              <span style={{ fontWeight: 'bold', color: '#e76f51' }}>📝 {movie.reviewCount}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#2a2a2a', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h3 style={{ marginTop: 0 }}>📊 Distribución por Género</h3>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {stats.moviesByGenre.map(g => (
            <div key={g.genre} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ width: '100px', fontWeight: 'bold' }}>{g.genre}</span>
              <div style={{ flex: 1, height: '30px', background: '#444', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                <div style={{
                  width: `${(g.count / stats.totalMovies) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #2a9d8f, #264653)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingRight: '0.5rem',
                  fontSize: '0.85rem',
                  fontWeight: 'bold'
                }}>
                  {g.count > 0 && g.count}
                </div>
              </div>
              <span style={{ minWidth: '80px', textAlign: 'right', color: '#888' }}>
                ⭐ {g.avgRating}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#2a2a2a', padding: '1.5rem', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>🕐 Actividad Reciente</h3>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {stats.recentReviews.map(review => (
            <div key={review.id} style={{ padding: '0.75rem', background: '#1a1a1a', borderRadius: '4px', borderLeft: '3px solid #2a9d8f' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div>
                  <strong>{review.author}</strong> revisó "<span style={{ color: '#2a9d8f' }}>{review.movieTitle}</span>"
                  <span style={{ marginLeft: '0.5rem' }}>{'⭐'.repeat(review.rating)}</span>
                </div>
                <span style={{ color: '#888', fontSize: '0.85rem' }}>
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p style={{ margin: 0, color: '#aaa', fontSize: '0.9rem', fontStyle: 'italic' }}>
                "{review.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, icon }) {
  return (
    <div style={{
      background: '#2a2a2a',
      padding: '1.5rem',
      borderRadius: '8px',
      textAlign: 'center',
      border: '1px solid #333'
    }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{icon}</div>
      <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2a9d8f', marginBottom: '0.25rem' }}>{value}</div>
      <div style={{ color: '#888', fontSize: '0.9rem' }}>{label}</div>
    </div>
  );
}

export default Dashboard;
