import React, { useState } from 'react'
import 'react-quill/dist/quill.snow.css';
import Editor from './Editor';
import { useRouter } from 'next/navigation';
import { UserAuth } from '../context/AuthContext'

const CreateBlog=() => {
    const [loading, setLoading]=useState(false)
    const { user }=UserAuth()
    const router=useRouter();
    const [title, setTitle]=useState('');
    const [summary, setSummary]=useState('');
    const [content, setContent]=useState('');
    const [files, setFiles]=useState('');
    // const [redirect, setRedirect]=useState(false);

    // function handleFileInputChange(event) {
    //     console.log(event.target.value);
    //     // setSelectedImages([...selectedImages, ...imagePreviews]);
    // }

    async function createNewPost(ev) {
        setLoading(true)
        const data=new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('userId', user.uid);
        data.set('file', files[0]);
        ev.preventDefault();
        const response=await fetch('http://localhost:3001/blogs/create', {
            method: 'POST',
            body: data,
            credentials: 'include',
        });
        if (response.ok) {
            router.replace("/")
        } else {
            alert("Error While Creating Blog")
        }
    }

    return (
        <div className='flex flex-col gap-y-10 py-6'>
            {loading? (
                <div>loading...</div>
            ):(
                <>
                    <h1 className='text-[48px] font-[600] text-[#043133] text-center '>Create New Blog</h1>
                    <form onSubmit={createNewPost} className="max-w-2xl mx-auto bg-slate-200 p-5 rounded-2xl">
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-gray-600">Title</label>
                            <input
                                type="text"
                                id="title"
                                className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                                placeholder="Title"
                                value={title}
                                onChange={(ev) => setTitle(ev.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="summary" className="block text-gray-600">Summary</label>
                            <input
                                type="text"
                                id="summary"
                                className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                                placeholder="Summary"
                                value={summary}
                                onChange={(ev) => setSummary(ev.target.value)}
                            />
                        </div>
                        <input type="file" className='mb-4'
                            onChange={ev => setFiles(ev.target.files)} />
                        <div className="mb-4">
                            <label className="block text-gray-600">Content</label>
                            <Editor value={content} onChange={setContent} />
                        </div>
                        <div className="mt-16">
                            <button
                                type="submit"
                                className="w-[100px] h-[50px] text-white text-[15px] font-[500] bg-[#007074] rounded-2xl"
                            >
                                Create Post
                            </button>
                        </div>
                    </form>
                </>
            )}

        </div>
    );

}

export default CreateBlog