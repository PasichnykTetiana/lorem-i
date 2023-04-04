import $api from "../http";
import { type AxiosResponse } from "axios";

export default class CartService {
  static async addCart(id?: string): Promise<AxiosResponse<CartResponse>> {
    return await $api.post(`/cart/add/${id}`);
  }
  static async deleteCartProduct(id?: string): Promise<AxiosResponse<CartResponse>> {
    return await $api.delete(`/cart/delete/${id}`);
  }
  static async cart(): Promise<AxiosResponse<CartResponse>> {
    return await $api.get(`/cart`);
  }
}
