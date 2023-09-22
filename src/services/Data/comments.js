import { baseUrl, httpservice } from "../httpService";


export async function getAllComments(id) {
    return await httpservice.get(baseUrl+`/comments/${id}`)
}

export async function postComment(id, data) {
    return await httpservice.post(baseUrl+`/comments/create/${id}`, data)
}