'use client'

import React from 'react'
import CreateBlog from '@/components/CreateBlog'
const page=() => {

    if (typeof window!=='undefined'&&window.document) {
        return (
            <CreateBlog />
        )
    } else {
        return null;
    }
}

export default page