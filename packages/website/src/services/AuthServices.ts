import $api from "../http";
import { type AxiosResponse } from "axios";

export async function registration(
  data: Data
): Promise<AxiosResponse<AuthResponse>> {
  return await $api.post<AuthResponse>("/registration", data);
}

export async function login(data: Data): Promise<AxiosResponse<AuthResponse>> {
  return await $api.post<AuthResponse>("/login", data);
}

export async function logout(): Promise<void> {
  await $api.post("/logout");
}

export async function users() {
  return await $api.get("/users");
}
