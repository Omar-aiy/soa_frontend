import axios from "axios";

class OrderService {
    constructor() {
        this.api = axios.create({
            baseURL: " 84.192.118.116:7001/",
        });
    }

    async getOrders() {
        const { data } = await this.api.get("/orders");
        return data;
    }

    async createOrder(order) {
        const result = {
            email: "test@gmail.com",
            products: order,
            serviceID: 6
        };
        const { data } = await this.api.post("/order", result);
        return data;
    }

    async deleteOrder(id) {
        const { data } = await this.api.delete(`/orders/${id}`);
        return data;
    }
}

export default new OrderService();