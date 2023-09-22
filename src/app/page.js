'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import AllBlogs from '@/components/AllBlogs'
const Home=() => {
    const router=useRouter();
    return (
        <div className='px-20 py-10 flex flex-col gap-y-6'>
            <div>
                <button
                    onClick={() => router.replace("/newblog")}
                    className='w-[140px] h-[50px] text-white text-[20px] font-[500] bg-[#007074] rounded-2xl'>Create Blog</button>
            </div>
            <div className='flex justify-center'>
                <AllBlogs />
            </div>
        </div>
    )
}


export default Home