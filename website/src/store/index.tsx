import {makeAutoObservable} from "mobx";
import { login } from "../services/AuthServices";


export default class Store {
    isAuth = false;
    user = {} as User;
    constructor() {
        makeAutoObservable(this);
    }
    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: User) {
        this.user = user;
    }

    async lala(){
        console.log(1332454654)
    }
    async login(data: any) {
        try {
            const response = await login(data);
            this.setAuth(true);
            localStorage.setItem('token', response.data.accessToken);
        } catch (e) {
            console.log('e.response?.data?.message');
        }
    }
}

