export default class ApiBackend {
    constructor(apiUrl = 'https://plankton-app-xhkom.ondigitalocean.app/api') {
        this.apiUrl = apiUrl;
    }

    async loadAllFilms() {
        const cleanUrl = this.apiUrl.endsWith('/') ? this.apiUrl : this.apiUrl + '/';
        const response = await fetch(cleanUrl + 'movies');
        
        if (!response.ok) {
            throw new Error(`Failed to fetch movies: ${response.statusText}`);
        }
        
        let payload;
        try {
            payload = await response.json();
        } catch (e) {
            throw new Error('Failed to parse JSON response');
        }

        console.log(payload);
        return payload;
    }
}

// Initialize with the new API URL
const apiBackend = new ApiBackend('https://plankton-app-xhkom.ondigitalocean.app/api');
apiBackend.loadAllFilms()
    .then(films => {
        console.log('Films:', films);
    })
    .catch(error => {
        console.error('Error:', error);
    });