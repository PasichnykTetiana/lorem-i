import $api from "../http";
import { type AxiosResponse } from "axios";

export default class ContentService {
  static async fetchWe(): Promise<AxiosResponse<Person[]>> {
    return await $api.get("/we");
  }

  static async fetchAllProducts(): Promise<AxiosResponse<Product[]>> {
    return await $api.get("/products");
  }

  static async fetchProduct(id?: string): Promise<AxiosResponse<Product>> {
    const url = `/products/${id}`;
    return await $api.get(url);
  }
}
