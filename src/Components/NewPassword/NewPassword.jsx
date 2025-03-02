import axios from "axios";
import { useFormik } from "formik"
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
const NewPassword = () => {

    const navigate = useNavigate()


    const initialValues = {
        email: "",
        newPassword: "",
    }


    const validYup = Yup.object().shape(
        {
            email: Yup.string()
                .required("Email is required.")
                .email("Invalid email format."),
            newPassword: Yup.string()
                .required("New Password is required.")
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                    "NewPassword must be at least 6 characters long and contain at least one number."
                ),
        }
    )

    async function signIn(values, { setSubmitting, resetForm }) {
        setSubmitting(true)
        try {
            const x = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
            resetForm()
            toast.success('New password created successfully')
            return x
        }
        catch (error) {
            toast.error("Something went wrong")
            return error
        } finally {
            setSubmitting(false)
            navigate("/")
            sessionStorage.clear()
        }

    }


    const formik = useFormik({
        initialValues,
        onSubmit: signIn,
        validationSchema: validYup,
    })

    

        useEffect(() => {
            
            if (!sessionStorage.getItem("code")) {
                navigate("/forgetPassword");
            }
        }, [navigate]);

    return (

        <div className="Login py-10" id="reg">
            <div className="title max-w-screen-xl w-[80%] mx-auto py-10">
                <h1 className="text-xl">New Password :</h1>

                <div className="inputs w-[70%] mx-auto">
                    <form onSubmit={formik.handleSubmit}>
                        {/* input email */}
                        <label htmlFor="email">Email :</label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" placeholder="Enter Your Email" id="email" name="email" className="focus:outline-[#0aad0a] bg-gray-50 border mb-[12px] border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                        {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                            <span className="font-medium">Error!</span> {formik.errors.email}
                        </div> : ""}
                        {/* input pass */}
                        <label htmlFor="newPassword">New Password :</label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.newPassword} type="Password" placeholder="Enter Your Password" id="newPassword" name="newPassword" className="focus:outline-[#0aad0a] bg-gray-50 border mb-[12px] border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                        {formik.errors.newPassword && formik.touched.newPassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                            <span className="font-medium">Error!</span> {formik.errors.newPassword}
                        </div> : ""}


                        <div className="flex justify-end">
                            <button type="submit" className="mx-2 bg-[#0aad0a] text-white py-2 px-4 rounded-2xl cursor-pointer disabled:opacity-65 disabled:cursor-not-allowed" disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}>
                                {formik.isSubmitting ? <i className="fa-solid fa-spin fa-spinner text-white"></i> : "Submit"}
                            </button>
                            <Link to={"/login"} onClick={()=> sessionStorage.clear} type="submit" className="mx-2 bg-red-700 text-white py-2 px-4 rounded-2xl cursor-pointer">
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default NewPassword
