// vite will now compile our scss
import './styles/styles.scss';
//JS Import
import MovieCardGenerator from './js/_frontpage_movie_cards.js';
import LoadAllFilmsPage from './js/LoadAllFilmsPage.js';
import ApiBackend from './js/ApiBackend.js';
import MobileMenu from './js/MobileMenu.js';
import initLiveEvents from './js/_initLiveEvents.js';

if(document.querySelector('.moviesSecond')) {
const loadingMessage = document.createElement('h4');
loadingMessage.classList.add('movies__message__new');
loadingMessage.innerText = 'Api is starting\nLoading movies... Please wait.';
document.querySelector('.movies__message').appendChild(loadingMessage);
loadingMessage.style.display = 'none';

const backend = new ApiBackend('https://plankton-app-xhkom.ondigitalocean.app/api');
console.log('Link to API:' + backend);
const filmList = new LoadAllFilmsPage(backend);
const moviesContainer = document.querySelector('.moviesSecond')

filmList.start(moviesContainer, loadingMessage);
} else {
  const backend = new ApiBackend('https://plankton-app-xhkom.ondigitalocean.app/api');
  const movieCardGenerator = new MovieCardGenerator(backend);
  movieCardGenerator.CardGenerator(4);
}

document.addEventListener('DOMContentLoaded', initLiveEvents);
