import $api from "../http";
import { type AxiosResponse } from "axios";

type CartResponse = {
    user: string;
    products: string[]
};


export default class CartService {
    static async addCart(id?: string): Promise<AxiosResponse<CartResponse>> {
        return await $api.post(`/cart/add/${id}`);
    }
}
