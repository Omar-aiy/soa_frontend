import axios from 'axios';

class GameService {
    
    constructor() {
        this.api = axios.create({
            baseURL: 'https://deboeck-gameshop.gigalixirapp.com',
        });
    }
    
    async getGames() {
        const { data } = await this.api.get('/products/list');
        return data.map((game) => {
            game.type = "Game";
            return game;
        });
    }

}

export default new GameService();