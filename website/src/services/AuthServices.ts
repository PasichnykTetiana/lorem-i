import $api, {API_URL} from "../http"
import axios, {AxiosResponse} from "axios";


export async function registration (data: Data) : Promise<AxiosResponse<AuthResponse>>{
    return $api.post<AuthResponse>('/registration', data)
}

export async function login (data: Data) : Promise<AxiosResponse<AuthResponse>>{
    return $api.post<AuthResponse>('/login', data)
}

export async function logout() : Promise<any>{
    return $api.post('/logout')
}


export async function users() {
        return $api.get('/users')
}

