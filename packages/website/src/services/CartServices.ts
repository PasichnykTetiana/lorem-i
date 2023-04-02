import $api from "../http";
import { type AxiosResponse } from "axios";

export default class CartService {
    static async addCart(id?: string): Promise<AxiosResponse<CartResponse>> {
        return await $api.post(`/cart/add/${id}`);
    }
    static async cart(): Promise<AxiosResponse<CartResponse>> {
        return await $api.get(`/cart`);
    }
}
