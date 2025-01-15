import { fetchMovieDetails } from './movie-api.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Get the movie ID from the URL parameters
    const params = new URLSearchParams(window.location.search); 
    const movieId = params.get('id'); 

    if (!movieId) {
        console.error('No movie ID found in the URL!');
        return;
    }

    try {
        const movieData = await fetchMovieDetails(movieId); // Fetch movie details from API
        console.log('Movie Data:', movieData);  // Debugging

        // Get movie attributes and update the page with movie details
        const movieAttributes = movieData.attributes;
        document.getElementById('movie-title').textContent = movieAttributes.title;
        document.getElementById('movie-image').src = movieAttributes.image.url;
        document.getElementById('movie-description').textContent = movieAttributes.intro;
        document.getElementById('movie-year').textContent = `Year: ${movieAttributes.year || 'N/A'}`;
        document.getElementById('movie-rating').textContent = `Rating: ${movieAttributes.rating || 'N/A'}`;
        document.getElementById('imdb-link').href = `https://www.imdb.com/title/${movieAttributes.imdbId}`;

    } catch (error) {
        console.error('Error fetching movie details:', error);
        alert('Failed to load movie details.');
    }
});