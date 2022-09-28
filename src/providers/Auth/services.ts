import { api } from "../../services/api/api";

export const auth = {
  login: (email: string, password: string) => {
    return api.post(`login`, {
      email: email,
      password: password,
    });
  },
  register: (data: any) => {
    return api.post(`register`, {
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.passwordConfirmation,
    });
  },
};
