// 'use strict';

// Import
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '43059810-21766dfeafea29ca9c24ae0e2';

async function servicePicture(picture = '', page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: picture,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.status);
  }
}

// Export
export { servicePicture };
