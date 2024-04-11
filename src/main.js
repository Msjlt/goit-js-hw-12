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

searchForm.addEventListener('submit', handleSubmit);

function clearMarkup() {
  list.innerHTML = '';
}

function handleSubmit(event) {
  event.preventDefault();
  const { picture } = event.currentTarget.elements;

  // Show Loader
  loader.style.display = 'block';

  // Clear
  clearMarkup();

  servicePicture(picture.value)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      } else {
        list.innerHTML = createMarkup(data.hits);

        const gallery = new SimpleLightbox('.pictureCard a', {
          captionType: 'attr',
          captionsData: 'alt',
          captionDelay: 250,
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      iziToast.error({
        title: 'Error',
        message:
          'An error occurred while fetching images. Please try again later!',
      });
      // Clear
      clearMarkup();
    })
    .finally(() => {
      // Hide Loader
      loader.style.display = 'none';
      // Clear
      searchForm.reset();
    });
}
