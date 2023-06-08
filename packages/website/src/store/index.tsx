import { makeAutoObservable } from "mobx";
import { login, registration, logout } from "../services/AuthServices";
import axios from "axios";
import { API_URL } from "../http";

export default class Store {
  isAuth = false;
  isRegistration = false;
  user = {} as User;
  userName = "" as string;
  isLoading = false;
  cart = [] as Cart[];

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setRegistration(bool: boolean) {
    this.isRegistration = bool;
  }

  setUser(user: User) {
    this.user = user;
  }

  setCart(cart: Cart[]) {
    this.cart = cart;
  }

  setUserName(userName: string) {
    this.userName = userName;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async registration(data: Data) {
    try {
      console.log(data)
      const response = await registration(data);
      this.setRegistration(true);
      console.log(response)
      this.setUserName(response.data.user.username);
    //  this.setAuth(true);
      localStorage.setItem("token", response.data.accessToken);
    } catch (e) {
      console.log(e);
    }
  }

  async login(data: Data) {
    try {
      const response = await login(data);
      console.log(response.data.user.isActivated)
      if(response.data.user.isActivated){
        this.setAuth(true);
      }
      this.setUserName(response.data.user.username);
      localStorage.setItem("token", response.data.accessToken);
    } catch (e) {
      console.log(e);
    }
  }

  async logout() {
    try {
      const response = await logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUserName("");
      this.setUser({} as any);
    } catch (e) {
      console.log(e);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUserName(response.data.user.username);
      this.setUser(response.data.user);
      console.log(response.data.user);
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }

  async checkCart() {
    try {
      const response = await axios.get<CartResponse>(`${API_URL}/cart`, {
        withCredentials: true,
      });
      this.setCart(response.data.products);
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }
}
