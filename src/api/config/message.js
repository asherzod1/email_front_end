import {HttpRequestHub} from "../httpRequestHub";

export const createMessage = (data) => {
    const config = {
        method: "POST",
        url: `message/`,
        data
    };
    return HttpRequestHub(config);
}

export const getUserMessages = (id) => {
    const config = {
        method: "GET",
        url: `users/${id}`
    };
    return HttpRequestHub(config);
}
