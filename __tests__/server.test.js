import request from 'supertest';
import express from 'express';
import server from '../server'; // Import your Express server instance

describe('GET /movies', () => {
  it('should return 200 OK and a list of movies', async () => {
    const response = await request(server).get('/movies'); // Call the /movies route
    expect(response.status).toBe(200); // Check for a successful response
    expect(response.text).toContain('<html>'); // You can check for any expected content in the response
  });
});

describe('GET /movie/:id', () => {
  it('should return 200 OK and movie details', async () => {
    const movieId = 1; // Example movie ID
    const response = await request(server).get(`/movie/${movieId}`); // Call the /movie/:id route
    expect(response.status).toBe(200); // Check for a successful response
    expect(response.body).toHaveProperty('data'); // Ensure the response has movie data
  });

  it('should return 404 if movie is not found', async () => {
    const movieId = 9999; // A non-existent movie ID
    const response = await request(server).get(`/movie/${movieId}`);
    expect(response.status).toBe(404); // Check for 404 status for non-existing movies
    expect(response.body.error).toBe('Movie not found'); // Check for the expected error message
  });
});