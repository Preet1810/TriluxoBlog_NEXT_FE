// import dynamic from "next/dynamic";
// import { Suspense } from "react";
// const ReactQuill=dynamic(import('react-quill'), { ssr: false })
// const Editor=({ value, onChange }) => {
//     const modules={
//         toolbar: [
//             [{ header: [1, 2, false] }],
//             ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//             [
//                 { list: 'ordered' },
//                 { list: 'bullet' },
//                 { indent: '-1' },
//                 { indent: '+1' },
//             ],
//             ['link', 'image'],
//             ['clean'],
//         ],
//     };

//     // Check if the code is running in a browser environment
//     return (
//         <div className="">
//             <ReactQuill
//                 className='h-[6rem]'
//                 value={value}
//                 theme={'snow'}
//                 onChange={onChange}
//                 modules={modules}
//             />
//         </div>
//     );
// };

// export default Editor;
