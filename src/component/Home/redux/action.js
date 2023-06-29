import { API_KEY } from '../../../config';
import api from '../../../utils/api';


export const getMovieData = () => api.get(`movie/popular?api_key=${API_KEY}`);

export const getTopMovie = () => api.get(`movie/top_rated?api_key=${API_KEY}`);

export const getSerchedMovie = (body) => api.get(`search/movie?api_key=${API_KEY}&query=${body?.title}&page=${body?.page} `);

export const getMovieDetailsByID = (body) => api.get(`movie/${body?.id}?api_key=${API_KEY}`);

export const getSimilarMovieByID = (body) => api.get(`movie/${body?.id}/similar`);


