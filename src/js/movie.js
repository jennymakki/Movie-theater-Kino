document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get('id'); // Get the movie ID from the URL query string
  
    if (!movieId) {
      console.error('No movie ID found in the URL!');
      return;
    }
  
    try {
      // Fetch movie details from your own server (not the external API)
      const response = await fetch(`/movie/${movieId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch movie details');
      }
  
      const movieData = await response.json(); // Get the movie data from the server
  
      // Ensure you check the data in the console first
      console.log('Movie Data:', movieData);
  
      // Get the attributes of the movie from the data
      const movieAttributes = movieData.attributes;
  
      // Update the page elements with movie data
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