import axios from 'axios';

class AnimeService {
    
    constructor() {
        this.api = axios.create({
            baseURL: 'http://84.192.118.116:7002/anime',
        });
    }
    
    async getAnimes() {
        const { data } = await this.api.get('/list');
        return data.map((anime) => {
            anime.type = "Anime";
            return anime;
        });
    }

    async addAnime(anime) {
        const {data} = await this.api.post('/post', anime)
        return data;
    }

    async deleteAnime (id) {
        const {data}  = await this.api.delete(`/delete/${id}`);
        return data;
    }

    async editAnime(id, anime) {
        const {data} = await this.api.put(`/update/${id}`, anime);
        return data;
    }

}

export default new AnimeService();