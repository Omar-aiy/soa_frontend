import axios from 'axios';

class MovieService {
    
    constructor() {
        this.api = axios.create({
            baseURL: 'https://movie-api-omar.herokuapp.com/',
        });
    }
    
    async getMovies() {
        const response = await this.api.get('/movies?page=1');
        const movies = response.data.data;
        return movies.map((movie) => {
            movie.type = "Movie";
            return movie;
        });
    }

}

export default new MovieService();