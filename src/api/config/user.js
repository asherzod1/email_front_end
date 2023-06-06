import {HttpRequestHub} from "../httpRequestHub";

export const createUser = (data) => {
    const config = {
        method: "POST",
        url: `users/`,
        data
    };
    return HttpRequestHub(config);
}

export const getUsers = () => {
    const config = {
        method: "GET",
        url: `users/`,
    };
    return HttpRequestHub(config);
}
