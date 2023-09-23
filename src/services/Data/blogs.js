import { baseUrl, httpservice } from "../httpservice";

export async function getAllBlogs() {
    return await httpservice.get(baseUrl+`/blogs`)
}

export async function getSingleBlog(id) {
    return await httpservice.get(baseUrl+`/blogs/${id}`)
}

export async function postBlog(data) {
    try {
        const response=await httpservice.post(
            baseUrl+'/blogs/create',
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        return response;
    } catch (error) {
        throw error;
    }
}