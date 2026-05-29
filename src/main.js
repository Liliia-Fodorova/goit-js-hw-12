import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let page = 1;
let totalHits = 0;
const PER_PAGE = 15;

form.addEventListener('submit', async event => {
  event.preventDefault();

  currentQuery = event.target.elements['search-text'].value.trim();

  if (!currentQuery) return;

  page = 1;
  clearGallery();
  hideLoadMoreButton();

  await fetchImages();

  form.reset();
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  await fetchImages();
  smoothScroll();
});

async function fetchImages() {
  try {
    showLoader();
    hideLoadMoreButton();

    const data = await getImagesByQuery(currentQuery, page);

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
    totalHits = data.totalHits;

    const totalPages = Math.ceil(totalHits / PER_PAGE);

    if (page >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        message:
          "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

function smoothScroll() {
  const card = document.querySelector('.gallery-item');
  if (!card) return;

  const { height } = card.getBoundingClientRect();

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}