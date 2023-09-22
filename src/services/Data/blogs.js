import { baseUrl, httpservice } from "../httpService";

export async function getAllBlogs() {
    return await httpservice.get(baseUrl+`/blogs`)
}

export async function getSingleBlog(id) {
    return await httpservice.get(baseUrl+`/blogs/${id}`)
}
