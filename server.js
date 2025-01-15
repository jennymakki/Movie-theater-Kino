
import express from 'express' 
import path from 'path'
import fs from 'fs/promises'

const app = express();
const PORT = 5080;

app.get ('/about-us.html', async (request, response) => {
    const buf = await fs.readFile ('./dist/about-us.html')
    const html = buf.toString()
    response.send(html) 
})

app.get ('/', async (request, response) => {
    const buf = await fs.readFile ('./dist/index.html')
    const html = buf.toString()
    response.send(html) 
})

app.get ('/movies', async (request, response) => {
    const buf = await fs.readFile ('./dist/movies.html')
    const html = buf.toString()
    response.send(html) 
})

app.get ('/movie', async (request, response) => {
    const buf = await fs.readFile ('./dist/movie.html')
    const html = buf.toString()
    response.send(html) 
})

// Serve static files from the "public" directory
    app.use('/kino-bio-projekt', express.static('./dist')) 

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});