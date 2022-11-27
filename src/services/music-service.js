import axios from 'axios';

class MusicService {
    
    constructor() {
        this.api = axios.create({
            baseURL: 'https://us-central1-soa2022-6b288.cloudfunctions.net/soa/',
        });
    }
    
    async getMusic() {
        const { data } = await this.api.get('/readplaylist');
        console.log(data);
        return data.map((music) => {
            music.type = "Music";
            return music;
        });
    }

}

export default new MusicService();