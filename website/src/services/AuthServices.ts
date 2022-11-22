import $api from "../http"
import {AxiosResponse} from "axios";


export async function registration (data: AuthResponse) : Promise<any>{
    return $api.post('/registration', data)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
}

export async function login (data: AuthResponse) : Promise<any>{
    return $api.post('/login', data)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
}