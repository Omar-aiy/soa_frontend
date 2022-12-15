import axios from 'axios';

class GameService {
    
    constructor() {
        this.api = axios.create({
            baseURL: 'http://84.192.118.116:7002/game',
        });
    }
    
    async getGames() {
        const { data } = await this.api.get('/list');
        return data.map((game) => {
            game.type = "Game";
            return game;
        });
    }

    async addGame(game) {
        const {data} = await this.api.post('/post', game)
        return data;
    }

    async editGame(id, game) {
        const {data} = await this.api.put(`/update/${id}`, game);
        return data;
    }

    async deleteGame (id) {
        const {data}  = await this.api.delete(`/delete/${id}`);
        return data;
    }

}

export default new GameService();