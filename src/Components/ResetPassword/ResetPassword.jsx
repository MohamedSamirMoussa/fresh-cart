import axios from "axios"
import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import * as Yup from 'yup';
const ResetPassword = () => {

    const navigate = useNavigate()
    const initialValues = {
        resetCode: ""
    }

    const validationSchema = Yup.object().shape({
        resetCode: Yup.string()
            .required("Reset code is required")
            .matches(/^\d{5,6}$/, "Reset code must be exactly 5 digits"),
    });

    async function resetCode(values, { setSubmitting, resetForm }) {
        const x = { resetCode: values.resetCode.toString() }
        setSubmitting(true)
        try {
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", x)
            resetForm()
            toast.success(data.status)
            sessionStorage.setItem("code", x.resetCode)

        } catch (error) {
            toast.error(error.response.data.message)

        } finally {
            setSubmitting(false)
            navigate("/newPassword")
        }
    }

    const formik = useFormik({
        initialValues,
        onSubmit: resetCode,
        validationSchema,
    })

        useEffect(()=>{
            if(sessionStorage.getItem("code") == null) {
                navigate("/resetPassword")
            }
        } , [navigate])


    return (

        <div className="Login py-10" id="reg">
            <div className="title w-[80%] mx-auto mt-10 py-10">
                <h1 className="text-2xl">Reset Now :</h1>

                <div className="inputs mx-auto w-1/2">
                    <form onSubmit={formik.handleSubmit}>
                        {/* input pass */}
                        <label htmlFor="resetCode">Reset Code :</label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.resetCode} type="text" placeholder="Enter Your Email" id="resetCode" name="resetCode" className="focus:outline-[#0aad0a] bg-gray-50 border mb-[12px] border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                        {formik.errors.resetCode && formik.touched.resetCode ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                            <span className="font-medium">Error!</span> {formik.errors.resetCode}
                        </div> : ""}

                        <div className="flex justify-center">
                            <button type="submit" className="bg-[#0aad0a] text-white py-2 px-4 rounded-2xl cursor-pointer disabled:opacity-65 disabled:cursor-not-allowed" disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}>
                                {formik.isSubmitting ? <i className="fa-solid fa-spin fa-spinner text-white"></i> : "Submit"}
                            </button>
                        </div>
                    </form>
                </div> </div>
        </div>

    )
}

export default ResetPassword
