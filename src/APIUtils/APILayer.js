import MockServer from "../MockServer/MockServer";
import * as _ from 'lodash'

const API_KEY = 'b7c8e374ce77bfc71b460437da95f3ec';
const LANG = 'en-US';

const BASE_URL = 'https://api.themoviedb.org/3';
const MOVIES_URL = `${BASE_URL}${'/discover/movie'}`
const GENRES_URL = `${BASE_URL}${'/genre/movie/list'}`

const GENRES_PARAMS = {
    api_key: API_KEY,
    language: LANG,
    sort_by: 'popularity.desc',
}
const MOVIE_LIST_PARAMS = {
    api_key: API_KEY,
    language: LANG,
    sort_by: 'popularity.desc',
};

class APILayer {
    constructor() {
        this.genresList = {};
        MockServer.get(GENRES_URL, GENRES_PARAMS)
            .then((genresList) => {
                this.genresList = genresList.data.genres;
            })
    }

    getMovies() {
        return MockServer.get(MOVIES_URL, MOVIE_LIST_PARAMS)
            .then((response)=>{
            return response.data.results;
            })
    }

    getGenreName(id) {
        var genreName = 'Unknown genre';
        if (this.genresList) {
            const genreById = _.find(this.genresList, {id: id})
            if (genreById) {
                genreName = genreById.name;
            }
            return genreName;
        }
    }
}

export default new APILayer();


