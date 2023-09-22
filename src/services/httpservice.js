import axios from "axios";
// export const baseUrl="http://localhost:3001";
export const baseUrl="https://triluxoblogbe.onrender.com";


axios.interceptors.request.use(async (request) => {
    request.headers={
        ...request.headers,
        // Authorization: `${TokenHelper.get()}`,
    };
    return request;
});

export const httpservice={
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    patch: axios.patch,
};