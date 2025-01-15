export async function fetchMovieDetails(movieId) {
    try {
        const response = await fetch(`https://plankton-app-xhkom.ondigitalocean.app/api/movies/${movieId}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch movie details. Status: ${response.status}`);
        }

        const movieData = await response.json();


        return movieData.data; 
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw new Error('Error fetching movie details: ' + error.message);
    }
}