import axios from 'axios';

class MusicService {
    
    constructor() {
        this.api = axios.create({
            baseURL: 'http://84.192.118.116:7002/music',
        });
    }
    
    async getMusic() {
        const { data } = await this.api.get('/list');
        console.log(data);
        return data.map((music) => {
            music.type = "Music";
            return music;
        });
    }

    async editMusic(id, music) {
        const {data} = await this.api.put(`/update/${id}`, music);
        return data;
    }

    async addMusic(music) {
        const {data} = await this.api.post('/post', music)
        return data;
    }

    async deleteMusic (id) {
        const response  = await this.api.delete(`/delete/${id}`);
        return response;
    }

}

export default new MusicService();