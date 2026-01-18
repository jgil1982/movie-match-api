const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = 'meta-llama/llama-3.2-3b-instruct:free';

function buildPrompt(movies) {
  const movieList = movies
    .map(m => `- ${m.title} (${m.year}) - ${m.genre}`)
    .join('\n');

  return `Eres un experto en cine. A continuación te presento una lista de películas:

${movieList}

Para cada película, proporciona UNA anécdota breve y curiosa (máximo 2 líneas) sobre su producción, elenco o impacto cultural. Responde en formato JSON como un array de objetos con esta estructura exacta:
[
  {
    "title": "Nombre de la película",
    "anecdota": "La anécdota aquí"
  }
]

Solo devuelve el JSON, sin texto adicional.`;
}

export async function enrichMoviesWithAI(movies) {
  if (!OPENROUTER_API_KEY) {
    return movies.map(movie => ({
      ...movie,
      ai_enriched: null
    }));
  }

  try {
    const prompt = buildPrompt(movies);

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Movie Match API'
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      return movies.map(movie => ({
        ...movie,
        ai_enriched: null
      }));
    }

    const data = await response.json();
    const aiContent = data.choices[0].message.content;

    const jsonMatch = aiContent.match(/\[[\s\S]*\]/);
    const anecdotes = JSON.parse(jsonMatch ? jsonMatch[0] : aiContent);

    return movies.map(movie => {
      const anecdote = anecdotes.find(a => a.title === movie.title);
      return {
        ...movie,
        ai_enriched: anecdote ? anecdote.anecdota : null
      };
    });
  } catch (error) {
    return movies.map(movie => ({
      ...movie,
      ai_enriched: null
    }));
  }
}
