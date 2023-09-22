import React from 'react'

const SingleComment=({ comment }) => {
    return (
        <div className='flex flex-col bg-slate-100 rounded-2xl p-4 w-2/3 gap-y-4'>
            <div className='flex gap-x-2 items-center'>
                <div className='w-[45px] h-[45px] rounded-full '>
                    <img className='object-contain rounded-full' src="https://res.cloudinary.com/dwh4llt0c/image/upload/v1680761292/bslbxb5othtsugdsgkdw.png" alt="profile" />
                </div>
                <div className='flex flex-col gap-y-1'>
                    <h3 className='text-[10px] font-[700] uppercase text-black'>Preetpal Singh</h3>
                </div>
            </div>

            <div>
                <p className='text-[18px] font-[500]  text-black'>{comment}</p>
            </div>

        </div>
    )
}

export default SingleComment