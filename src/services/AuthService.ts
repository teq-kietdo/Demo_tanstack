import { IUser } from "../interfaces/IAuth";
import { requestHandler, httpAuth } from "../utils/httpClient";

export const AuthService = {
    login(username: string, password: string) {
        const callApi = () => {
            return httpAuth.post<IUser>(`/api/login`, {
                username,
                password
            });
        };
        return requestHandler(callApi);
    },
}