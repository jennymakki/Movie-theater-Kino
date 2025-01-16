import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import fetch from 'node-fetch'; // For making API requests

const app = express();
const PORT = 5080;
const API_URL = 'https://plankton-app-xhkom.ondigitalocean.app/api/movies';

// Serve the static HTML pages
app.get('/about-us.html', async (request, response) => {
    const buf = await fs.readFile('./dist/about-us.html');
    const html = buf.toString();
    response.send(html);
});

app.get('/', async (request, response) => {
    const buf = await fs.readFile('./dist/index.html');
    const html = buf.toString();
    response.send(html);
});

app.get('/movies', async (request, response) => {
    const buf = await fs.readFile('./dist/movies.html');
    const html = buf.toString();
    response.send(html);
});

// Modified '/movie' route: fetch movie details from the API
app.get('/movie/:id', async (request, response) => {
    const movieId = request.params.id; // Get the movie ID from the URL parameter

    try {
        // Fetch movie data from the external API
        const apiResponse = await fetch(`${API_URL}/${movieId}`);
        const movieData = await apiResponse.json();
        
        // Check if the movie data exists and send it as JSON to the client
        if (movieData && movieData.data) {
            response.json(movieData.data); // Send the movie data to the client
        } else {
            response.status(404).json({ error: 'Movie not found' });
        }
    } catch (error) {
        console.error('Error fetching movie details:', error);
        response.status(500).json({ error: 'Failed to load movie details' });
    }
});

// Serve static files from the "dist" folder
app.use('/kino-bio-projekt', express.static('./dist'));

// Start the server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

// Export app for testing
export default app;