import React, { useEffect } from 'react'
import { UserAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
const Navbar=() => {
    const { user, googleSignIn, logOut }=UserAuth();
    const router=useRouter();
    const handleSignOut=async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const checkAuthentication=async () => {
            await new Promise((resolve) => setTimeout(resolve, 50));
        };
        checkAuthentication();
    }, [user]);

    return (
        <div className='flex px-20 items-center h-[133px] border border-b'>
            <div className='flex items-center'>
                <p
                    onClick={() => router.replace("/")}
                    className='text-[#043133] text-[30px] font-[600] tracking-widest cursor-pointer'>Triluxo Blog</p>
            </div>
            <div className='flex justify-center items-center flex-grow gap-x-16 text-[#043133] text-[20px] font-[500]'>
                <p className='text-[#043133] font-[600]'>Blogs</p>
                <p>About</p>
                <p>Links</p>
                <p>Projects</p>
            </div>
            <div className='ml-auto'>
                {user? (
                    <button
                        className='w-[100px] h-[40px] text-white text-[20px] font-[500] bg-[#007074] rounded-2xl'
                        onClick={handleSignOut}
                    >
                        Logout
                    </button>
                ):(
                    <button
                        className='w-[140px] h-[50px] text-white text-[20px] font-[500] bg-[#007074] rounded-2xl'
                        onClick={() => router.replace('/signup')}
                    >
                        Signup/Login
                    </button>
                )}

            </div>
        </div>
    );
};




export default Navbar