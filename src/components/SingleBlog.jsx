import React from 'react';
import typewriter from '../assets/typewriter.jpg';
import { useRouter } from 'next/navigation';
const SingleBlog=({ imgsrc, summary, id }) => {
    const router=useRouter();
    const truncatedSummary=summary.length>54? summary.slice(0, 54)+'...':summary;
    return (
        <div
            onClick={() => router.replace(`/blog/${id}`)}
            className='w-[304px] h-[304px] flex flex-col justify-center items-center  gap-y-6 overflow-hidden hover:bg-slate-200 p-3 cursor-pointer rounded-2xl'>
            <div className='w-[300px] h-[180px] flex'>
                <img className='object-cover' src={imgsrc} alt="" />
                {/* <Image src= alt='' width={304} height={176} className='object-contain' /> */}
            </div>
            <div>
                <p className='text-black font-[500] text-[22px] leading-[26px] text-center'>
                    {truncatedSummary}
                </p>
            </div>
        </div>
    );
};

export default SingleBlog;
