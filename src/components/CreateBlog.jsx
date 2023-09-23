import React, { useState } from 'react'
// import Editor from './Editor';
import { useRouter } from 'next/navigation';
import { UserAuth } from '../context/AuthContext'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { FormControl } from "@mui/base";
import { InputLabel, TextField, InputAdornment } from "@mui/material";
import FormHelperText from '@mui/material/FormHelperText';
import { RiDeleteBinLine, RiImageAddLine, RiArrowLeftSLine } from 'react-icons/ri'
import { postBlog } from '@/services/Data/blogs';




function checkIfFilesAreTooBig(files) {
    let valid=true;
    if (files) {
        files.forEach(function (file) {
            const size=file.size/1024/1024;
            if (size>10) { //10 mb
                valid=false;
            }
        });
    }
    return valid;
}

function checkIfVidFilesAreTooBig(files) {
    let valid=true;
    if (files) {
        files.forEach(function (file) {
            const size=file.size/1024/1024;
            if (size>100) {  //100 mb
                valid=false;
            }
        });
    }
    return valid;
}

function checkIfFilesAreCorrectType(files) {
    let valid=true;
    if (files) {
        files.forEach(function (file) {
            if (!['application/pdf', 'image/jpeg', 'image/png', 'video/mp4', 'video/avi', 'video/quicktime'].includes(file.type)) {
                valid=false;
            }
        });
    }
    return valid;
}


const CreateBlog=() => {

    const [loading, setLoading]=useState(false)
    const { user }=UserAuth()
    const router=useRouter();
    const [title, setTitle]=useState('');
    const [summary, setSummary]=useState('');
    const [content, setContent]=useState('');
    const [files, setFiles]=useState('');
    const [selectedImages, setSelectedImages]=useState([]);
    const [selectedVideos, setselectedVideos]=useState([]);
    const [video, setVideo]=useState('');


    const blogCreateSchema=Yup.object({
        title: Yup.string().min(2).max(200).required("Title is required Field"),
        summary: Yup.string().min(2).max(800).required("Summary is required field"),
        content: Yup.string().min(2).max(10000).required("Content is required field"),
        images: Yup.array()
            .min(1, "At least one image is required")
            .test("is-correct-file", "Images must be in JPEG or PNG format", checkIfFilesAreCorrectType)
            .test("is-not-too-big", "Images must be under 10MB", checkIfFilesAreTooBig),
        videos: Yup.array()
            .min(1, "At least one video is required")
            .test("is-correct-file", "Videos must be in mp4, avi, or MOV format", checkIfFilesAreCorrectType)
            .test("is-not-too-big", "Videos must be under 100MB", checkIfVidFilesAreTooBig),
        // images: Yup.object().shape({
        //     files: Yup.array()
        //         // .nullable()
        //         .required('VALIDATION_FIELD_REQUIRED')
        //     // .test('is-correct-file', 'VALIDATION_FIELD_FILE_BIG', checkIfFilesAreTooBig)
        //     // .test(
        //     //     'is-big-file',
        //     //     'VALIDATION_FIELD_FILE_WRONG_TYPE',
        //     //     checkIfFilesAreCorrectType
        //     // ),
        // }),
        // videos: Yup.object().shape({
        //     files: Yup.array()
        //         // .nullable()
        //         .required('VALIDATION_FIELD_REQUIRED')
        // })

    });

    const [initialValues, setInitialValues]=useState({
        title: "",
        summary: "",
        content: "",
        images: [],
        videos: []
    })

    const formik=useFormik({
        initialValues,
        validationSchema: blogCreateSchema,
        onSubmit: async (values, action) => {
            console.log(
                " Form Values",
                values
            );
            try {
                setLoading(true);
                const response=await postBlog(values);
                action.resetForm();
                setSelectedImages([])
                setselectedVideos([])
                setLoading(false);
            } catch (error) {
                setLoading(false);
                alert("Error While Creating Hostel")
            }


        },
        // console.log(formik.errors)
    });

    function handleVidInputChange(event) {
        const selectedFiles=event.target.files;
        const selectedVideosArray=Array.from(selectedFiles);

        const vidFiles=selectedVideosArray.map((image) => image);

        formik.setFieldValue("videos", [...formik.values.videos, ...vidFiles]);

        // Preview each selected image
        const vidPreviews=selectedVideosArray.map((vid) => {
            return {
                file: vid,
                previewURL: URL.createObjectURL(vid),
            };
        });
        setselectedVideos([...selectedVideos, ...vidPreviews]);
    }

    const handleVidDelete=(id) => {
        setselectedVideos((prevSelectedVid) =>
            prevSelectedVid.filter((vid, index) => index!==id)
        );
        formik.setFieldValue(
            "videos",
            formik.values.videos.filter((vid, index) => index!==id)
        )
    };

    function handleImageInputChange(event) {
        const selectedFiles=event.target.files;
        const selectedImagesArray=Array.from(selectedFiles);

        const imageFiles=selectedImagesArray.map((image) => image);

        formik.setFieldValue("images", [...formik.values.images, ...imageFiles]);

        // Preview each selected image
        const imagePreviews=selectedImagesArray.map((image) => {
            return {
                file: image,
                previewURL: URL.createObjectURL(image),
            };
        });
        setSelectedImages([...selectedImages, ...imagePreviews]);
    }

    const handleImageDelete=(id) => {
        setSelectedImages((prevSelectedImages) =>
            prevSelectedImages.filter((image, index) => index!==id)
        );
        formik.setFieldValue(
            "images",
            formik.values.images.filter((image, index) => index!==id)
        )
    };
    // const [redirect, setRedirect]=useState(false);

    // function handleFileInputChange(event) {
    //     console.log(event.target.value);
    //     // setSelectedImages([...selectedImages, ...imagePreviews]);
    // }

    // async function createNewPost(ev) {
    //     setLoading(true)
    //     const data=new FormData();
    //     data.set('title', title);
    //     data.set('summary', summary);
    //     data.set('content', content);
    //     data.set('userId', user.uid);
    //     data.set('userId', user.uid);
    //     data.set('file', files[0]);
    //     ev.preventDefault();
    //     console.log(data);
    //     const response=await fetch('https://triluxoblogbe.onrender.com/blogs/create', {
    //         method: 'POST',
    //         body: data,
    //         credentials: 'include',
    //     });
    //     if (response.ok) {
    //         router.replace("/")
    //     } else {
    //         alert("Error While Creating Blog")
    //     }
    // }

    return (
        <div className='flex flex-col gap-y-10 py-6'>
            {loading? (
                <div>loading...  Large videos could take upto 5 minutes to upload.</div>
            ):(
                <>
                    <h1 className='text-[48px] font-[600] text-[#043133] text-center '>Create New Blog</h1>
                    <div className='flex justify-center'>
                        <form onSubmit={formik.handleSubmit} className='w-[50rem] flex flex-col py-10 px-[5rem] bg-slate-100 rounded-xl shadow-2xl gap-y-4'>
                            <div>
                                <FormControl className=" flex flex-col gap-y-1">
                                    <InputLabel htmlFor="title" className="!text-[20px] !text-[#4D5959] !font-[700]">Title</InputLabel>
                                    <TextField
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        type="text"
                                        name="title"
                                        id="title"
                                        sx={{ '& .MuiInputBase-root': { borderRadius: '0px', backgroundColor: "#EFF0F2" }, '& .MuiInputBase-input': { height: '25px' } }}
                                        size="small"
                                    // placeholder=""
                                    // helperText={formik.errors.email}

                                    />
                                    {formik.touched.title&&formik.errors.title&&(
                                        <FormHelperText>{formik.errors.title}</FormHelperText>
                                    )}
                                </FormControl>
                            </div>
                            <div>
                                <FormControl className=" flex flex-col gap-y-1">
                                    <InputLabel htmlFor="summary" className="!text-[20px] !text-[#4D5959] !font-[700]">Summary</InputLabel>
                                    <TextField
                                        value={formik.values.summary}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        multiline
                                        type="text"
                                        name="summary"
                                        id="summary"
                                        sx={{ '& .MuiInputBase-root': { borderRadius: '0px', backgroundColor: "#EFF0F2" }, '& .MuiInputBase-input': { height: '45px' } }}
                                        size="small"
                                    // placeholder=""
                                    // helperText={formik.errors.email}

                                    />
                                    {formik.touched.summary&&formik.errors.summary&&(
                                        <FormHelperText>{formik.errors.summary}</FormHelperText>
                                    )}
                                </FormControl>
                            </div>
                            <div>
                                <FormControl className=" flex flex-col gap-y-1">
                                    <InputLabel htmlFor="summary" className="!text-[20px] !text-[#4D5959] !font-[700]">Content</InputLabel>
                                    <TextField
                                        value={formik.values.content}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        multiline rows={6}
                                        type="text"
                                        name="content"
                                        id="content"
                                        sx={{ '& .MuiInputBase-root': { borderRadius: '0px', backgroundColor: "#EFF0F2" }, '& .MuiInputBase-input ': { height: '75px' } }}
                                        size="small"
                                    // placeholder=""
                                    // helperText={formik.errors.email}

                                    />
                                    {formik.touched.content&&formik.errors.content&&(
                                        <FormHelperText>{formik.errors.content}</FormHelperText>
                                    )}
                                </FormControl>
                            </div>
                            <div className='flex flex-col gap-y-1'>
                                <div className='flex justify-between'>
                                    <h2 className='text-[20px] !text-[#4D5959] !font-[700]'>Add Blog Images</h2>
                                </div>
                                <div className='flex flex-wrap gap-3'>
                                    {selectedImages?.map((image, id) => (
                                        <div key={id} className='w-[166px] h-[28px] rounded-3xl bg-[#C5C5C5] flex justify-between items-center px-3 py overflow-hidden'>
                                            <p className='text-[10px] font-[400] text-[#262626]'>
                                                {image.file.name.length>10? `${image.file.name.substring(0, 18)}...`:image.file.name}
                                            </p>
                                            <RiDeleteBinLine className='cursor-pointer' onClick={() => handleImageDelete(id)} />
                                        </div>
                                    ))}
                                </div>
                                <div
                                    onClick={() => {
                                        document.getElementById('fileInput').click();
                                        formik.setFieldTouched('images', true);
                                    }}
                                    className='w-[103px] h-[32px] border border-[#CCCCCC] flex justify-center items-center gap-x-2 rounded-lg cursor-pointer'>
                                    <RiImageAddLine />
                                    <p className='text-[10px] font-[400] text-black'>Add Image</p>
                                    <input
                                        type='file'
                                        id='fileInput'
                                        name='images'
                                        // value={values.images}
                                        multiple
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={handleImageInputChange}
                                    />
                                </div>
                                {formik.touched.images&&formik.errors.images&&(
                                    // <FormHelperText>{formik.errors.videos}</FormHelperText>
                                    <p className='text-[0.75rem] font-[400] text-[#00000099]'>{formik.errors.images}</p>
                                )}
                            </div>
                            <div className='flex flex-col gap-y-1'>
                                <div className='flex justify-between'>
                                    <h2 className='text-[20px] !text-[#4D5959] !font-[700]'>Add Blog Videos</h2>
                                </div>
                                <div className='flex flex-wrap gap-3'>
                                    {selectedVideos?.map((image, id) => (
                                        <div key={id} className='w-[166px] h-[28px] rounded-3xl bg-[#C5C5C5] flex justify-between items-center px-3 py overflow-hidden'>
                                            <p className='text-[10px] font-[400] text-[#262626]'>
                                                {image.file.name.length>10? `${image.file.name.substring(0, 18)}...`:image.file.name}
                                            </p>
                                            <RiDeleteBinLine className='cursor-pointer' onClick={() => handleVidDelete(id)} />
                                        </div>
                                    ))}
                                </div>
                                <div
                                    name='videos'
                                    onClick={() => {
                                        document.getElementById('vidfileInput').click();
                                        formik.setFieldTouched('videos', true);
                                    }}
                                    className='w-[103px] h-[32px] border border-[#CCCCCC] flex justify-center items-center gap-x-2 rounded-lg cursor-pointer'>
                                    <RiImageAddLine />
                                    <p className='text-[10px] font-[400] text-black'>Add Videos</p>
                                    <input
                                        type='file'
                                        id='vidfileInput'

                                        // value={values.images}
                                        name='videos'
                                        multiple
                                        accept="video/*"
                                        style={{ display: 'none' }}
                                        onChange={handleVidInputChange}
                                    />
                                </div>
                                {formik.touched.videos&&formik.errors.videos&&(
                                    // <FormHelperText>{formik.errors.videos}</FormHelperText>
                                    <p className='text-[0.75rem] font-[400] text-[#00000099]'>{formik.errors.videos}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={!formik.isValid}
                                className="w-[150px] h-[50px] text-white text-[20px] font-[500] bg-[#007074] rounded-xl"
                            >
                                Create Post
                            </button>
                        </form>
                    </div>
                </>
            )}

        </div>
    );

}

export default CreateBlog