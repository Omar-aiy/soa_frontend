import axios from 'axios';

class MangaService {
    
    constructor() {
        this.api = axios.create({
            baseURL: 'https://soa-shop-api.herokuapp.com/api',
        });
    }
    
    async getMangas() {
        const { data } = await this.api.get('/products');
        return data.map((mange) => {
            mange.type = "Manga";
            return mange;
        });
    }

}

export default new MangaService();