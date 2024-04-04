import { IUser } from "../interfaces/IAuth";

export const getLocalStorageToken: () => IUser = () => {
    let token: string | undefined | null;
    if (typeof window !== "undefined") {
        const key = "user"
        token = window.localStorage.getItem(key);
    }
    if (!token) {
        return null;
    }

    let parsedToken;
    try {
        parsedToken = JSON.parse(token);
    } catch (err) {
        console.log(err);
        return null;
    }

    if (!parsedToken) return null;
    return parsedToken;
};