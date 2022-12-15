import axios from "axios";
import { setServiceId } from "../functions/functions";

class OrderService {
    constructor() {
        this.api = axios.create({
            baseURL: 'http://84.192.118.116:7002/order',
        });
    }

    async getOrders() {
        const { data } = await this.api.get("/list");
        return data;
    }

    async createOrder(order) {
        const result = {
            email: "test@gmail.com",
            products: setServiceId(order),
            serviceId: 6
        };
        const { data } = await this.api.post("/create", result);
        return data;
    }

    async deleteOrder(id) {
        const { data } = await this.api.delete(`/delete/${id}`);
        return data;
    }
}

export default new OrderService();