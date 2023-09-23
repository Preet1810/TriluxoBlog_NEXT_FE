import React, { useEffect, useState } from 'react'
import { getSingleBlog } from '@/services/Data/blogs'
import { useParams } from 'next/navigation'
import { BsFacebook } from 'react-icons/bs'
import { AiFillTwitterCircle } from 'react-icons/ai'
import SingleComment from './SingleComment'
import { InputLabel, TextField, InputAdornment, FormControl } from "@mui/material";
import { UserAuth } from '@/context/AuthContext';
import { postComment, getAllComments } from '@/services/Data/comments'
import { useRouter } from 'next/navigation'
import Intro from './Video'
import './BlogSingle.css'
const BlogSingle=() => {
    const slider=React.useRef(null);
    const router=useRouter();
    const { user }=UserAuth();
    const [rcvd, setrcvd]=useState();
    const [blog, SetBlog]=useState();
    const params=useParams()
    const { id }=params;
    const [allComments, setAllComments]=useState();
    const [comment, setComment]=useState('')

    const onComment=async () => {
        if (user) {
            const obj={ comment: comment, userId: user.uid }
            const { data }=await postComment(id, obj);
            getComments(id);

        } else {
            router.push("/login");
        }

    }

    const getComments=async (id) => {
        const { data }=await getAllComments(id);
        setAllComments(data.result);
    }

    const getBlog=async (id) => {
        try {
            const { data }=await getSingleBlog(id)
            SetBlog(data.result);
        } catch (error) {
            alert("Error While getting a blog")
        }
    }

    useEffect(() => {
        getBlog(id)
    }, [id])
    useEffect(() => {
        getComments(id)
    }, [blog])

    useEffect(() => {
        console.log(allComments)
    }, [allComments])

    const [contentWithImages, setContentWithImages]=useState('');

    useEffect(() => {
        if (blog&&blog.content) {
            // Split the content into an array of chunks with a maximum length of 100 characters.
            const contentChunks=blog.content.match(/.{1,100}/g);

            // Map through the content chunks and add an image from the blog.image array after every chunk.
            const contentWithImagesArray=contentChunks.map((chunk, index) => (
                <React.Fragment key={index}>
                    {chunk}
                    {blog.image&&blog.image[index]&&(
                        <div className='w-full'>
                            <img
                                className='object-contain'
                                src={blog.image[index]}
                                alt={`Image ${index}`}
                            />
                        </div>
                    )}
                </React.Fragment>
            ));

            // Join the content chunks and images to create the final content.
            setContentWithImages(contentWithImagesArray);
        }
    }, [blog]);
    return (
        <>
            {blog? (
                <div className='w-[55rem] px-10 flex flex-col gap-y-10 mt-10'>
                    <div className='flex justify-between items-center w-full'>
                        <div className='flex gap-x-2 '>
                            <div className='w-[57px] h-[57px] rounded-full '>
                                <img className='object-contain rounded-full' src="https://res.cloudinary.com/dwh4llt0c/image/upload/v1680761292/bslbxb5othtsugdsgkdw.png" alt="profile" />
                            </div>
                            <div className='flex flex-col gap-y-1 items-center justify-center'>
                                <h3 className='text-[16px] font-[700] uppercase text-black'>Preetpal Singh</h3>
                                <p className='text-[16px] font-[700] text-black'>Sep 21, 2023 · 4 min read</p>
                            </div>
                        </div>
                        <div className='w-[140px] h-[44px] flex border border-[#EAEAEA] items-center rounded-xl shadow-2xl ml-auto'>
                            <div className='border-r-2 h-full w-1/2 flex justify-center items-center'>
                                <BsFacebook className='text-[25px]' />
                            </div>
                            <div className='h-full w-1/2 flex justify-center items-center'>
                                <AiFillTwitterCircle className='text-[29px]' />
                            </div>

                        </div>
                    </div>

                    <div className='w-full flex flex-col gap-y-10'>
                        <h1 className='text-[42px] font-[700] text-black '>{blog?.title}</h1>

                        <h2 className='text-[32px] font-[700] text-black '>Summary</h2>
                        <div className='text-[20px] font-[400] text-black leading-[34px]'>
                            {blog?.summary}
                        </div>
                        <Intro vid={blog.video[0]} />
                        <h2 className='text-[32px] font-[700] text-black '>Blog</h2>
                        <div
                            className='text-[18px] font-[400] text-black leading-[34px]'
                        // dangerouslySetInnerHTML={{ __html: blog?.content||'' }}
                        >
                            {contentWithImages}
                        </div>


                    </div>

                    <div className='w-[640px] h-[2px] bg-black'>
                    </div>
                    <div>
                        <h2 className='text-[26px] font-[700]  text-black'>Comments...</h2>
                        <div className='flex flex-col gap-y-3'>
                            {allComments?.map((comment, index) => (
                                <SingleComment key={index} comment={comment.comment} />
                            ))}
                        </div>

                    </div>
                    <div>
                        <h2 className='text-[26px] font-[700]  text-black'>Add New Comment</h2>
                        <div className='w-2/3 flex flex-col gap-y-5'>
                            <FormControl className=" flex flex-col gap-y-1" variant="outlined">
                                <TextField
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    // onBlur={formik.handleBlur}
                                    type="text"
                                    name="comment"
                                    id="comment"
                                    multiline
                                    sx={{ '& .MuiInputBase-root': { borderRadius: '0px', backgroundColor: "#EFF0F2" }, '& .MuiInputBase-input': { height: '45px' } }}
                                    size="small"
                                    placeholder=""

                                />
                            </FormControl>
                            <button
                                onClick={() => onComment()}
                                className='w-[150px] h-[50px] text-white text-[20px] font-[500] bg-[#007074] rounded-2xl'>Comment</button>
                        </div>
                    </div>
                </div>
            ):(
                <div>Loading Blog ...</div>
            )}

        </>

    )
}

export default BlogSingle