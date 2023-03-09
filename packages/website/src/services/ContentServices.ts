import $api from "../http";
import {AxiosResponse} from 'axios';
//import {AuthResponse} from "../models/response/AuthResponse";
// import {IUser} from "../models/IUser";
// interface Person {
//     _id: string;
//     name: string;
//     occupation: string;
//     photo: string;
// }
export default class ContentService {
    static fetchWe(): Promise<AxiosResponse<Person[]>> {
        return $api.get('/we')
    }
}