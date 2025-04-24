import { API } from "./api";

export const AuthAPI = {
  login: (email: string) => API.post("/auth/login/", { email }),
  confirm: (email: string, code: string) => 
    API.post("/auth/confirm/", { email, code }),
};