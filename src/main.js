'use strict';

// Library Izitoast
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Library SimpleLightbox
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Import
import { servicePicture } from './js/pixabay-api.js';
import { createMarkup } from './js/render-functions.js';

// Code
const searchForm = document.getElementById('search-form');
const list = document.getElementById('list');
const loadButton = document.getElementById('load-button');
const loader = document.querySelector('.loader');
const gallery = new SimpleLightbox('.pictureCard a', {
  captionType: 'attr',
  captionsData: 'alt',
  captionDelay: 250,
});
let currentPage = 1;
let currentQuery = '';

// EventListener
searchForm.addEventListener('submit', handleSubmit);
loadButton.addEventListener('click', event => {
  event.preventDefault();
  handleLoadMore();
});

function clearMarkup() {
  list.innerHTML = '';
}

loadButton.style.display = 'none';

async function handleSubmit(event) {
  event.preventDefault();
  const { picture } = event.currentTarget.elements;
  currentQuery = picture.value;

  // Show Loader
  loader.style.display = 'block';

  // Clear
  clearMarkup();

  try {
    const data = await servicePicture(currentQuery, currentPage);

    if (data.hits.length === 0) {
      loadButton.style.display = 'none';
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      list.innerHTML = createMarkup(data.hits);
      toggleLoadButton(data.totalHits);
      gallery.refresh();
    }
  } catch (error) {
    console.error('Error:', error);
    iziToast.error({
      title: 'Error',
      message:
        'An error occurred while fetching images. Please try again later!',
    });
  } finally {
    // Hide Loader
    loader.style.display = 'none';
    // Reset form
    searchForm.reset();
  }
}

async function handleLoadMore() {
  currentPage += 1;
  try {
    const data = await servicePicture(currentQuery, currentPage);
    if (data.hits.length > 0) {
      list.insertAdjacentHTML('beforeend', createMarkup(data.hits));
      toggleLoadButton(data.totalHits);

      // Slow scroll
      const galleryCardHeight = document
        .querySelector('.pictureCard')
        .getBoundingClientRect().height;
      window.scrollBy({
        top: galleryCardHeight * 3,
        behavior: 'smooth',
      });

      gallery.refresh();
    } else {
      iziToast.info({
        title: 'Info',
        message: 'No more images to load!',
      });
    }

    // The end check
    if (currentPage * 15 >= data.totalHits) {
      loadButton.style.display = 'none';
      iziToast.info({
        title: 'End of search results',
        message:
          "We're sorry, but you're nearing the end of the search results.",
      });
    }
  } catch (error) {
    console.error('Error:', error);
    iziToast.error({
      title: 'Error',
      message:
        'An error occurred while fetching more images. Please try again later!',
    });
  }
}

function toggleLoadButton(totalHits) {
  if (currentPage * 15 < totalHits) {
    loadButton.style.display = 'block';
  } else {
    loadButton.style.display = 'none';
  }
}
