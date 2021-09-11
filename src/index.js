import './sass/main.scss';
import galleryRender from "./templates/gallery-Item.hbs"
import { debounce } from 'lodash';
import NewApiRequest from './apiService'


const galleryEl = document.querySelector('.gallery');

let searchString = '';
let preCurrentValue = ' ';
let requestEl = ''
const inputEl = document.querySelector('.search__input')
inputEl.addEventListener('input', debounce(onSearch, 500));

const newApiService = new NewApiRequest();

function onSearch(e) {
  
  if (e.target.value === " " || e.target.value === "") return;
  // let isTrue = true;

  newApiService.query = e.target.value;
  console.log(newApiService.query)
  newApiService.resetPage();
  newApiService.feachArticles().then(hits => {
    clearGalleryContainer();
    appendHitsMarkup(hits)
  })
    
  
  // if (searchString.every(e => (e === ''))) {return}
  // if (searchString[searchString.length - 1] !== '') {
  //   preCurrentValue = searchString;
  // }
  // for (let i = 0; i < searchString.length - 1; i += 1) {
  //   if (searchString[i] !== preCurrentValue[i]) {
  //     isTrue = false;
  //   }
  // }

  // if ((isTrue) && (searchString[searchString.length - 1] === '')) { return }

  // if (searchString.length > 1) {searchString = searchString.join('+') }

  // if (searchString.length > 1) { searchString = searchString.split('+') }
  // console.log(searchString)
  // return e.target.value
}

function appendHitsMarkup(hits) {
  galleryEl.insertAdjacentHTML('beforeend', galleryRender({hits}))
}

function clearGalleryContainer() {
  galleryEl.innerHTML = '';
}
