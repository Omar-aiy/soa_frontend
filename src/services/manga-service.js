import axios from 'axios';

class MangaService {
    
    constructor() {
        this.api = axios.create({
            baseURL: 'http://84.192.118.116:7002/manga',
        });
    }

    
    async getMangas() {
        const { data } = await this.api.get('/list');
        return data.map((mange) => {
            mange.type = "Manga";
            return mange;
        });
    }

    async addManga(manga) {
        const {data} = await this.api.post('/post', manga)
        return data;
    }

    async deleteManga (id) {
        const {data}  = await this.api.delete(`/delete/${id}`);
        return data;
    }

    async editManga(id, manga) {
        const {data} = await this.api.put(`/update/${id}`, manga);
        return data;
    }

}

export default new MangaService();