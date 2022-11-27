import axios from 'axios';

class BookService {
    
    constructor() {
        this.api = axios.create({
            baseURL: 'http://84.192.118.116:7000',
        });
    }
    
    async getBooks() {
        const { data } = await this.api.get('/book/list');
        return data.map((book) => {
            book.type = "Book";
            return book;
        });
    }

}

export default new BookService();