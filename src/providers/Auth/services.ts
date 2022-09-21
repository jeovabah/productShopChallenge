import { api } from "../../services/api/api";

export const auth = {
    login: (email: string, password: string) => {
        return api.post(`login`, {
            email : email,
            password : password,
        })
    }
}