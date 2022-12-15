import axios from 'axios';

class BookService {
    
    constructor() {
        this.api = axios.create({
            baseURL: 'http://84.192.118.116:7002/book',
        });
    }
    
    async getBooks() {
        const { data } = await this.api.get('/list');
        return data.map((book) => {
            book.type = "Book";
            return book;
        });
    }

    async deleteBook (id) {
        const {data}  = await this.api.delete(`/delete/${id}`);
        return data;
    }

    async addBook(book) {
        const {data} = await this.api.post('/post', book)
        return data;
    }

    async editBook(id, book) {
        const {data} = await this.api.put(`/update/${id}`, book);
        return data;
    }

}

export default new BookService();