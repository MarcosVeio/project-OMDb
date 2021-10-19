import api from '../http';

export const getMovieBySearch = (search) => {
    return api.get(`/?apikey=ade1a9f3&s=${search}`)
}