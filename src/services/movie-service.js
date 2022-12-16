import axios from 'axios';
import * as https from 'https';

class MovieService {
    
    constructor() {
        this.api = axios.create({
            baseURL: 'http://84.192.118.116:7002/movie',
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        });
    }
    
    async getMovies() {
        const response = await this.api.get('/list');
        const movies = response.data.data;
        return movies.map((movie) => {
            movie.type = "Movie";
            return movie;
        });
    }

    async getMovie(title) {
        const response =  await this.api.get(`/get/${title}`);
        const movie = response.data.data;
        movie.type = "Movie";
        return movie;
    }

    async editMovie(id, movie) {
        const response = await this.api.put(`/update/${id}`, movie);
        console.log(response.data.data);
        return response.data.data;
    }

    async addMovie(movie) {
        const response = await this.api.post('/post', movie);
        return response.data.data;
    }

    async deleteMovie(id) {
        const { data } = await this.api.delete(`/delete/${id}`);
        return { data: data.data };
     }

}

export default new MovieService();