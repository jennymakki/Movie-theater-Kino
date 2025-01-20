import { expect, test, beforeAll } from '@jest/globals';
import request from 'supertest';
import { initApp } from '../server.js';
import fetch from 'node-fetch';

let app;
let moviesData = [];

beforeAll(async () => {
  app = initApp();

  const response = await fetch('https://plankton-app-xhkom.ondigitalocean.app/api/movies');
  const data = await response.json();
  
  if (data && data.data) {
    moviesData = data.data;
  }
});

describe('Movies Page', () => {
  test('Home page shows list of movies', async () => {
    const response = await request(app)
      .get('/movies')
      .expect('Content-Type', /html/)
      .expect(200);

    moviesData.forEach(movie => {
      expect(response.text).toContain(movie.attributes.title);
    });
  });
});

describe('Individual Movie Pages', () => {
  test('Individual movie page shows correct movie title', async () => {
    const movie = moviesData[0];

    const response = await request(app)
      .get(`/movie/${movie.id}`)
      .expect('Content-Type', /html/)
      .expect(200);

    expect(response.text).toContain(movie.attributes.title);
  });
});

describe('404 Error Page', () => {
  test('Movie page returns 404 for non-existing movie', async () => {
    const response = await request(app)
      .get('/movie/9999999')
      .expect(404);

    expect(response.text).toContain('The page you are looking for does not exist.');
  });
});