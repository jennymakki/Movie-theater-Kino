import { defineConfig } from 'vite';

export default defineConfig({
  base: '/kino-bio-projekt/', // Replace 'my-vite-app' with your repository name
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        aboutUs: './about-us.html',
        movies: './movies.html',
        movie: './movie.html',
      },
    },
  },
});
