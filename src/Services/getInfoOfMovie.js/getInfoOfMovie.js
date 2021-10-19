import api from '../http';

export const getInfoOfMovie = (id) => {
    return api.get(`/?apikey=ade1a9f3&i=${id}`)
}