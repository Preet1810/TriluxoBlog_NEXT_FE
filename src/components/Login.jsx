import React, { useState, useEffect } from 'react'
import { FormControl } from "@mui/base";
import { InputLabel, TextField, InputAdornment } from "@mui/material";
import FormHelperText from '@mui/material/FormHelperText';
import typewriter from '../assets/typewriter.jpg';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useRouter } from 'next/navigation';
import { UserAuth } from '@/context/AuthContext';
import Image from 'next/image'
const Login=() => {
    const router=useRouter();
    const { emailPasswordSignIn }=UserAuth();
    const [respose, setrespose]=useState()
    const [loading, setLoading]=useState(false);



    const [initialValues, setInitialValues]=useState({
        // userName: "",
        email: "",
        password: ""
    })
    // const auth=getAuth();
    const handleLogin=async (data) => {
        setLoading(true)
        try {
            await emailPasswordSignIn(data)
        } catch (error) {
            alert(error)
        }
    };

    const signInSchema=Yup.object({
        email: Yup.string().email().required("Please enter your email"),
        password: Yup.string().min(7).max(25).required("Please enter your password"),
    });


    const formik=useFormik({
        initialValues,
        validationSchema: signInSchema,
        onSubmit: async (values, action) => {
            console.log(
                " Form Values",
                values
            );
            try {
                setLoading(true);
                handleLogin(values)
                action.resetForm()
                setLoading(false);
            } catch (error) {
                setLoading(false);
                alert("Error While Login Account")
            }


        },
    });


    useEffect(() => {
        console.log("respo:", respose)
    }, [respose])


    return (
        <>
            {loading? (<div>Loading...</div>):(
                <div className='flex'>
                    <div className='w-1/2'>
                        <div className='w-[600px] h-full '>
                            <Image
                                className="object-contain"

                                src={typewriter} alt='typewriter' />
                        </div>
                    </div>
                    <div className='w-1/2 py-10 flex flex-col gap-y-8 justify-center'>
                        <h1 className='text-[48px] font-[600] text-[#043133] text-center'>Welcome Back</h1>
                        <form onSubmit={formik.handleSubmit} className='px-28 flex flex-col gap-y-6'>
                            <div>
                                <FormControl className=" flex flex-col gap-y-1">
                                    <InputLabel htmlFor="email" className="!text-[20px] !text-[#4D5959] !font-[700]">Email</InputLabel>
                                    <TextField
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        type="email"
                                        name="email"
                                        id="email"
                                        sx={{ '& .MuiInputBase-root': { borderRadius: '0px', backgroundColor: "#EFF0F2" }, '& .MuiInputBase-input': { height: '45px' } }}
                                        size="small"
                                        placeholder="email@gmail.com"
                                    // helperText={formik.errors.email}

                                    />
                                    {formik.touched.email&&formik.errors.email&&(
                                        <FormHelperText>{formik.errors.email}</FormHelperText>
                                    )}
                                </FormControl>
                            </div>
                            <div>
                                <FormControl className=" flex flex-col gap-y-1" variant="outlined">
                                    <InputLabel htmlFor="password" className="!text-[20px] !text-[#4D5959] !font-[700]">Password</InputLabel>
                                    <TextField
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        type="text"


                                        name="password"
                                        id="password"
                                        sx={{ '& .MuiInputBase-root': { borderRadius: '0px', backgroundColor: "#EFF0F2" }, '& .MuiInputBase-input': { height: '45px' } }}
                                        size="small"
                                        placeholder=""
                                    // helperText={formik.errors.password}

                                    />
                                    {formik.touched.password&&formik.errors.password&&(
                                        <FormHelperText>{formik.errors.password}</FormHelperText>
                                    )}
                                </FormControl>
                            </div>
                            <div className='flex flex-col gap-y-4 justify-center items-center'>
                                <button type='submit' className='w-[300px] h-[60px] text-white text-[26px] font-[500] bg-[#007074] rounded-2xl'>Sign In</button>
                                <div className='flex gap-x-1'>
                                    <p className='text-[18px] font-[500] text-[#4D5959]'>New To Triluxo? </p> <span className='text-[18px] font-[600] text-[#007074] cursor-pointer' onClick={() => router.replace('/signup')}> Sign Up</span>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            )}
        </>
    )
}

export default Login