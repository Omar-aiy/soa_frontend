import axios from 'axios';

class AnimeService {
    
    constructor() {
        this.api = axios.create({
            baseURL: 'https://r0716032-soa-restapi.herokuapp.com/',
        });
    }
    
    async getAnimes() {
        const { data } = await this.api.get('/products');
        return data.map((anime) => {
            anime.type = "Anime";
            return anime;
        });
    }

}

export default new AnimeService();