import $api from "../http";
import { type AxiosResponse } from "axios";

export default class ContentService {
  static async fetchWe(): Promise<AxiosResponse<Person[]>> {
    return await $api.get("/we");
  }
}
