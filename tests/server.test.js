import { expect, test } from '@jest/globals';
import request from 'supertest';
import { initApp } from '../server.js';

test('Home page shows list of movies', async () => {
  const app = initApp();

  const response = await request(app)
    .get('/movies')
    .expect('Content-Type', /html/)
    .expect(200);

  expect(response.text).toContain('Encanto');
  expect(response.text).toContain('Forrest Gump');
});