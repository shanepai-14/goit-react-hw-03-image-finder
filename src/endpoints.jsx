import axios from "axios";

const API_KEY = '43652750-d633fc097b58da3bac7af6bee';
const BASE_URL = 'https://pixabay.com/api/';


export const fetch_images_url = (searchQuery, page = 1) => {
    const params = new URLSearchParams({
      key: API_KEY,
      q: searchQuery,
      image_type: 'photo',
      page: page,
      per_page: 12, // You can adjust this value as needed
    });
    
    return `${BASE_URL}?${params.toString()}`;
  };

  export const fetchImages = async (searchQuery, page = 1) => {
    try {
      const url = fetch_images_url(searchQuery, page);
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching images:', error);
      throw error;
    }
  };