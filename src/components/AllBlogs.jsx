import React, { useEffect, useState } from 'react'
import { getAllBlogs } from '@/services/Data/blogs'
import SingleBlog from './SingleBlog';
const AllBlogs=() => {

    const [blogs, setBlogs]=useState();

    const allBlogs=async () => {
        const { data }=await getAllBlogs();
        setBlogs(data.result);
    }

    useEffect(() => {
        allBlogs()
    }, [])
    useEffect(() => {
        console.log(blogs);
    }, [blogs])

    return (
        <div className='flex flex-col gap-y-20'>
            <div>
                <h1 className='text-black text-center font-[700] text-[44px] '>All Blogs</h1>
            </div>
            <div className='grid grid-cols-2 gap-x-6 gap-y-10'>
                {blogs
                    ?.slice()
                    .reverse()
                    .map((blog, index) => (
                        <SingleBlog
                            id={blog._id}
                            key={index}
                            imgsrc={blog.image[0]}
                            summary={blog.summary}
                        />
                    ))}
            </div>
        </div>
    )
}

export default AllBlogs