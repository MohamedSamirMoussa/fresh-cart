import axios from "axios";
import { useFormik } from "formik"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';

const Register = () => {

  const navigate = useNavigate()
  // Values From back-end
  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  }

  // Validation with Yup library 
  const validYup = Yup.object().shape({
    name: Yup.string().required("Name is required").min(3, "At least input 3 characters "),
    email: Yup.string().required("E-mail is required").email("Invalid e-mail format"),
    password: Yup.string().required("Password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "Password must be at least 6 characters and contain at least one number "),
    rePassword: Yup.string().required("Re-password is required").oneOf([Yup.ref("password")], "Re-password isn't match with password"),
    phone: Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/, "Phone must be an egyptian number"),
  })

  // Send data and calling APIs
  async function signup(values, {setSubmitting , resetForm}) {
    try {

      setSubmitting(true)
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      toast.success(data.message)
      resetForm()
      setSubmitting(false)
      navigate("/login")
    } catch (error) {
      toast.error(error.response.data.message);
      
    } finally {
      setSubmitting(false)
    }
  }

  // Handle forms by formik
  const formik = useFormik({
    initialValues,
    onSubmit: signup,
    validationSchema: validYup,
  })
  return (
    <>
      <div className="register py-10 mt-10" id="reg">
        <div className="title mx-auto w-[80%] py-10">
          <h1 className="text-xl">Register Now :</h1>
        </div>
        <div className="inputs w-[70%] mx-auto">
          <form onSubmit={formik.handleSubmit}>
            {/* input name */}
            <label htmlFor="name">Name :</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" placeholder="Your Name" id="name" name="name" className="bg-gray-50 border mb-[12px] border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-[#0aad0a]" />
            {formik.errors.name && formik.touched.name ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <span className="font-medium">Error !</span> {formik.errors.name}
            </div> : ""}
            {/* input email */}
            <label htmlFor="email">Email :</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" placeholder="Enter Your Email" id="email" name="email" className="focus:outline-[#0aad0a] bg-gray-50 border mb-[12px] border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
            {formik.errors.email && formik.touched.email ?
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                <span className="font-medium">Error!</span> {formik.errors.email}
              </div>
              :
              ""
            }
            {/* input pass */}
            <label htmlFor="password">Password :</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" placeholder="Enter Your Email" id="password" name="password" className="focus:outline-[#0aad0a] bg-gray-50 border mb-[12px] border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
            {formik.errors.password && formik.touched.password ?
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                <span className="font-medium">Error!</span> {formik.errors.password}
              </div>
              :
              ""
            }
            {/* input rePass */}
            <label htmlFor="rePassword">Re-password :</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" placeholder="Enter Your Pass" id="rePassword" name="rePassword" className="focus:outline-[#0aad0a] bg-gray-50 border mb-[12px] border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
            {formik.errors.rePassword && formik.touched.rePassword ?
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                <span className="font-medium">Error!</span> {formik.errors.rePassword}
              </div>
              :
              ""
            }
            {/* input phone */}
            <label htmlFor="phone">Phone :</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" placeholder="Enter Your Email" id="phone" name="phone" className="focus:outline-[#0aad0a] bg-gray-50 border mb-[12px] border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
            {formik.errors.phone && formik.touched.phone ?
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                <span className="font-medium">Error!</span> {formik.errors.phone}
              </div>
              :
              ""
            }

            <div className="flex justify-end">
              <button type="submit" className="bg-[#0aad0a] text-white py-2 px-4 rounded-2xl cursor-pointer disabled:opacity-65 disabled:cursor-not-allowed" disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}>
                {formik.isSubmitting ? <i className="fa-solid fa-spin fa-spinner text-white fa-lg"></i> : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register
