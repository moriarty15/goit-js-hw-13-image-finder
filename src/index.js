import './sass/main.scss';
import galleryRender from "./templates/gallery-Item.hbs"
import { debounce } from 'lodash';
import NewApiRequest from './apiService'

import * as basicLightbox from 'basiclightbox'

const galleryEl = document.querySelector('.gallery');

let searchString = '';
let preCurrentValue = ' ';
let requestEl = ''
const inputEl = document.querySelector('.search__input')
inputEl.addEventListener('input', debounce(onSearch, 500));

const newApiService = new NewApiRequest();

const arrayLargeImageURL = [];
const arrayIdImg = [];

function onSearch(e) {
  let currentRequest = e.target.value;
  if (e.target.value === " " || e.target.value === "") return;
  if (currentRequest.split(' ').length > 1) {
    if (currentRequest.split(' ').every(e => e === ''))
      {return}
  }
  // let isTrue = true;

  newApiService.query = e.target.value;
  newApiService.resetPage();
  newApiService.feachArticles().then(hits => {
    hits.forEach(e => arrayLargeImageURL.push(e.largeImageURL))
    hits.forEach(e => arrayIdImg.push(e.id))
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

galleryEl.addEventListener('click', openModal);

let srcOnModal = '';

function openModal(e) {
  if (e.target.nodeName === 'IMG') {
    let idValue = Number(e.target.id);
    for (let i = 0; i < arrayIdImg.length; i += 1) {
      if (arrayIdImg[i] === idValue) {
        srcOnModal = arrayLargeImageURL[i];
        break;
      }
    }
    basicLightbox.create(`
		<img width="1400" height="900" src="${srcOnModal}">
	`).show()
  }
    // console.log(arrayLargeImageURL)
  // console.log(arrayIdImg)
  return
}

