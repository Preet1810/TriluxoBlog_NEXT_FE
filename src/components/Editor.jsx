'use client'

import React from 'react'
import ReactQuill from "react-quill";

const Editor=({ value, onChange }) => {
    const modules={
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link', 'image'],
            ['clean'],
        ],
    };
    if (document) {
        return (
            <div className="">
                <ReactQuill
                    className='h-[6rem]'
                    value={value}
                    theme={'snow'}
                    onChange={onChange}
                    modules={modules} />
            </div>
        );
    } else {
        return <textarea value={value} />
    }
}

export default Editor