'use client'

import React from 'react'
import Login from '@/components/Login'
import { UserAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const LogIn=() => {
    const { user }=UserAuth();
    const router=useRouter();

    return (
        <div>
            {user? router.replace("/"):<Login />}
        </div>
    )
}

export default LogIn