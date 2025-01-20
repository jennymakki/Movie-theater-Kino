import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { marked } from 'marked';

const API_URL = 'https://plankton-app-xhkom.ondigitalocean.app/api/movies';

// Function to create and configure the app
const initApp = () => {
  const app = express();
  const PORT = 5080;
  
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));

  // Static files (e.g., for CSS and JS)
  app.use('/assets', express.static(path.join(__dirname, 'public')));

  // Static HTML pages
  app.get('/about-us.html', async (request, response) => {
    const buf = await fs.readFile('./dist/about-us.html');
    const html = buf.toString();
    response.send(html);
  });

  app.get('/', async (request, response) => {
    response.render('index', { title: 'Home' });
  });

  // Dynamic route for all movies
  app.get('/movies', async (request, response) => {
    try {
      const apiResponse = await fetch(API_URL);
      const moviesData = await apiResponse.json();

      if (!moviesData || !moviesData.data) {
        return response.status(404).json({ error: 'No movies found' });
      }

      moviesData.data.forEach(movie => {
        movie.attributes.introHtml = marked(movie.attributes.intro);
      });

      if (request.headers['accept'] === 'application/json') {
        return response.json(moviesData);
      }

      response.render('movies', { 
        title: 'Movies - Kino Bio',
        movies: moviesData.data 
      });
    } catch (error) {
      console.error('Error fetching movies:', error);
      response.status(500).json({ error: 'Error fetching movies' });
    }
  });

  // Dynamic route for individual movie details
  app.get('/movie/:id', async (request, response) => {
    const movieId = request.params.id;

    try {
      const apiResponse = await fetch(`${API_URL}/${movieId}`);
      const movieData = await apiResponse.json();

      if (movieData && movieData.data) {
        const movie = movieData.data;
        movie.attributes.introHtml = marked(movie.attributes.intro);

        response.render('movie', {
          title: movie.attributes.title,
          movie: movie
        });
      } else {
        if (request.headers['accept'] === 'application/json') {
          return response.status(404).json({ error: 'Movie not found' });
        }
        response.status(404).render('404', {
          title: 'Movie Not Found'
        });
      }
    } catch (error) {
      console.error('Error fetching movie details:', error);
      response.status(500).send('Failed to load movie details');
    }
  });

  // Serve static files from the "dist" folder
  app.use('/kino-bio-projekt', express.static('./dist'));
  app.use('/kino-bio-projekt/assets', express.static('./dist/assets'));

  // 404 handler - if no routes match, this will render the 404 page
  app.use((request, response) => {
    response.status(404).render('404', {
      title: 'Page Not Found'
    });
  });

  return app;
};

// Export the function to create the app
export { initApp };

// If this is the entry point (not in test mode), start the server
if (process.env.NODE_ENV !== 'test') {
  const app = initApp();
  const PORT = 5080;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}