import axios from 'axios';


const API_KEY = '35757579-810682b68e67eb47e9525b84f';
const BASE_URL = 'https://pixabay.com';

export const fetchImages = async (query, page) => {
    const response = await axios.get(`${BASE_URL}/api/?key=${API_KEY}&q=${query}&page=${page}`);
    const data = response.data;
    // console.log(data);
    return data;
};
