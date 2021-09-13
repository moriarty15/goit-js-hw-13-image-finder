import './sass/main.scss';
import galleryRender from "./templates/gallery-Item.hbs"
import { debounce } from 'lodash';
import NewApiRequest from './apiService'
import { alert, notice, info, success, error } from '@pnotify/core';

import * as basicLightbox from 'basiclightbox'

const galleryEl = document.querySelector('.gallery');
const targetEl = document.querySelector('.target');

const inputEl = document.querySelector('.search__input')
inputEl.addEventListener('input', debounce(onSearch, 500));

const newApiService = new NewApiRequest();

const arrayLargeImageURL = [];
const arrayIdImg = [];
// IntersectionObserver
const observed = new IntersectionObserver(observerScroollHandlet, { threshold: 1.0 })

let currentRequest = '';

function onSearch(e) {
  if (e.target.value.trim() === "" || currentRequest === e.target.value.trim()) return;
  currentRequest = e.target.value.trim();

  clearGalleryContainer();
  observed.unobserve(targetEl)
  newApiService.query = currentRequest;

  newApiService.resetPage();
    
  return observed.observe(targetEl)  
}

function observerScroollHandlet(entries) {
  if (!entries[0].isIntersecting) return  
    return feaching();
}  

function feaching() {
  return newApiService.feachArticles().then(hits => {
    if (hits.length === 0) {return info({
  text: "По данному запросу ничего не найдено, сделайте запрос более специфичным"
})}
    hits.forEach(e => arrayLargeImageURL.push(e.largeImageURL))
    hits.forEach(e => arrayIdImg.push(e.id))
    appendHitsMarkup(hits)
  }).catch(err => 
         {error({
  text: "Упс, что-то пошло не так, попробуйте еще раз"})})
}

function appendHitsMarkup(hits) {
  galleryEl.insertAdjacentHTML('beforeend', galleryRender({hits}))
}

function clearGalleryContainer() {
  galleryEl.innerHTML = '';
}

// модалка с фотографией исходного размера
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
  return
}
