import axios from "axios";
import { useFormik } from "formik"

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"
import * as Yup from 'yup';
const ForgetPassword = () => {
    const navigate = useNavigate()

    const initialValues = {
        email: "",

    }

    async function signIn(values, { setSubmitting, resetForm }) {
        setSubmitting(true)
        try {
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values)
            resetForm()
            toast.success(data.message)
        } catch (error) {
            console.log(error);

        } finally {
            setSubmitting(false)
            navigate("/resetPassword")
        }


    }



    const validYup = Yup.object().shape(
        {
            email: Yup.string()
                .required("Email is required.")
                .email("Invalid email format."),
        }
    )

    const formik = useFormik({
        initialValues,
        onSubmit: signIn,
        validationSchema: validYup,
    })


    return (

        <div className="Login py-10" id="reg">
            <div className="title max-w-screen-xl w-[80%] mx-auto py-10">
                <h1 className="text-xl">Forget Password :</h1>
            </div>
            <div className="inputs w-[70%] mx-auto">
                <form onSubmit={formik.handleSubmit}>
                    {/* input email */}
                    <label htmlFor="email">Email :</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" placeholder="Enter Your Email" id="email" name="email" className="focus:outline-[#0aad0a] bg-gray-50 border mb-[12px] border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                    {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                        <span className="font-medium">Error!</span> {formik.errors.email}
                    </div> : ""}

                    <div className="flex justify-end">
                        <button type="submit" className="bg-[#0aad0a] text-white py-2 px-4 rounded-2xl cursor-pointer disabled:opacity-65 disabled:cursor-not-allowed" disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}>
                            {formik.isSubmitting ? <i className="fa-solid fa-spin fa-spinner text-white"></i> : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default ForgetPassword
