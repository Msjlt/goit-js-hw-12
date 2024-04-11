'use strict';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '43059810-21766dfeafea29ca9c24ae0e2';

function servicePicture(picture = '') {
  const params = new URLSearchParams({
    key: API_KEY,
    q: picture,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return fetch(`${BASE_URL}?${params}`).then(responce => {
    if (!responce.ok) {
      throw new Error(responce.status);
    }
    return responce.json();
  });
}

// Export
export { servicePicture };
