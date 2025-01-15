import SearchFilter from "./SearchFilter";

export default class LoadAllFilmsPage extends EventTarget {
    constructor(backend) {
        super();
        this.backend = backend;
    }

    async start(listContainer) {
        try {
            const filmsFromApi = await this.backend.loadAllFilms();
            console.log("Full API Response:", filmsFromApi);  // Log the entire response
    
            // Check if the response has a 'data' field that is an array
            if (filmsFromApi && Array.isArray(filmsFromApi.data)) {
                this.films = filmsFromApi.data;
            } else {
                throw new Error("API response does not contain an array of films");
            }
    
            this.filter = new SearchFilter('');
            this.filter.addEventListener('change', () => {
                this.update();
            });
    
            const filterElem = this.filter.render();
            listContainer.append(filterElem);
    
            const listElem = document.createElement('ul');
            listElem.className = 'moviesSecond__list';
            listContainer.append(listElem);
    
            this.films = this.films.map(filmData => {
                const filmElem = this.renderFilm(filmData);
                listElem.append(filmElem);
                return { data: filmData, elem: filmElem };
            });
        } catch (error) {
            console.error("Error loading films:", error);
        }
    }

    update() {
        this.films.forEach(({ data, elem }) => {
            const doesMatch = this.filter.doesFilmMatch({ data });
            elem.style.display = doesMatch ? 'block' : 'none';
        });
    }

    renderFilm(data) {
        const movieData = data.attributes;
    
        // Format the date using JavaScript's Date object (or use a library if preferred)
        const formattedDate = new Date(movieData.createdAt).toLocaleDateString('en-US', {
            weekday: 'long', // "Monday"
            year: 'numeric', // "2024"
            month: 'long',   // "January"
            day: 'numeric'   // "22"
        });
    
        const movieCard = document.createElement('li');
        movieCard.classList.add('moviesSecond__list__elem');
    
        movieCard.innerHTML = `
            <img src="${movieData.image?.url}" class="moviesSecond__list__elem__image" alt="${movieData.title}">
            <h3 class="moviesSecond__list__elem__title">${movieData.title}</h3>
            <p class="moviesSecond__list__elem__desc">${movieData.intro || 'No description available'} <strong>(${movieData.year || 'N/A'})</strong></p>
            <p class="moviesSecond__list__elem__rating">
                <a href="https://www.imdb.com/title/${movieData.imdbId}" target="_blank">
                    <img src="images/IMDb.png" alt="IMDb" class="imdb-logo" />
                </a>
            </p>
            <p class="moviesSecond__list__elem__date">Released on: ${formattedDate}</p>
            <a href="https://www.imdb.com/title/${movieData.imdbId}" class="moviesSecond__list__elem__link" target="_blank">More info</a>
        `;
        
        return movieCard;
    }
}
