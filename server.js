import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { marked } from 'marked';

const app = express();
const PORT = 5080;
const API_URL = 'https://plankton-app-xhkom.ondigitalocean.app/api/movies';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory (where EJS templates are stored)
app.set('views', path.join(__dirname, 'views'));

// Serve the static HTML pages
app.get('/about-us.html', async (request, response) => {
    const buf = await fs.readFile('./dist/about-us.html');
    const html = buf.toString();
    response.send(html);
});

app.get('/', async (request, response) => {
response.render('index')
});

// Dynamic route for all movies
app.get('/movies', async (request, response) => {
    try {
        // Fetch movies from the API
        const apiResponse = await fetch(API_URL);
        const moviesData = await apiResponse.json();

        // Check if we received the movies data correctly
        if (!moviesData || !moviesData.data) {
            return response.status(404).send('No movies found');
        }

        moviesData.data.forEach(movie => {
            movie.attributes.introHtml = marked(movie.attributes.intro); // Convert Markdown to HTML
        });

        // Render the EJS template with the movie data
        response.render('movies', { 
            title: 'Movies - Kino Bio',
            movies: moviesData.data 
        });
    } catch (error) {
        console.error('Error fetching movies:', error);
        response.status(500).send('Error fetching movies');
    }
});

// Dynamic route for individual movie details
app.get('/movie/:id', async (request, response) => {
    const movieId = request.params.id;

    try {
        // Fetch the movie details from the API using the movie ID
        const apiResponse = await fetch(`${API_URL}/${movieId}`);
        const movieData = await apiResponse.json();

        // Check if the movie data exists and render it with the EJS template
        if (movieData && movieData.data) {
            const movie = movieData.data;

            movie.attributes.introHtml = marked(movie.attributes.intro); // Convert Markdown to HTML
            
            // Pass the movie and a dynamic title to the template
            response.render('movie', {
                title: movie.attributes.title, // Set the title dynamically based on the movie
                movie: movie                   // Pass the full movie data
            });
        } else {
            response.status(404).send('Movie not found');
        }
    } catch (error) {
        console.error('Error fetching movie details:', error);
        response.status(500).send('Failed to load movie details');
    }
});

// Serve static files from the "dist" folder
app.use('/kino-bio-projekt', express.static('./dist'));
app.use('/kino-bio-projekt/assets', express.static('./dist/assets'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});