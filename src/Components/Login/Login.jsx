import axios from "axios";
import { useFormik } from "formik"
import { useContext } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { AuthContext } from "../../Context/AuthContext";
const Login = () => {



  const { setToken } = useContext(AuthContext)


  const navigate = useNavigate()


  const initialValues = {
    email: "",
    password: "",
  }


  const validYup = Yup.object().shape(
    {
      email: Yup.string()
        .required("Email is required.")
        .email("Invalid email format."),
      password: Yup.string()
        .required("Password is required.")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
          "Password must be at least 6 characters long and contain at least one number."
        ),
    }
  )

  async function signIn(values, { setSubmitting, resetForm }) {
    setSubmitting(true)
    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      setToken(data.token)
      localStorage.setItem("tkn", data.token)
      toast.success(data.message)
      resetForm()
      setSubmitting(false)
      navigate("/")
    }
    catch (error) {
      toast.error(error.response.data.message)
      setSubmitting(false)
    }

  }


  const formik = useFormik({
    initialValues,
    onSubmit: signIn,
    validationSchema: validYup,
  })


  return (

    <div className="Login py-10 mt-10" id="reg">
      <div className="title max-w-screen-xl w-[80%] mx-auto py-10">
        <h1 className="text-xl">Login Now :</h1>
      </div>
      <div className="inputs w-[70%] mx-auto">
        <form onSubmit={formik.handleSubmit}>
          {/* input email */}
          <label htmlFor="email">Email :</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" placeholder="Enter Your Email" id="email" name="email" className="focus:outline-[#0aad0a] bg-gray-50 border mb-[12px] border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
          {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            <span className="font-medium">Error!</span> {formik.errors.email}
          </div> : ""}
          {/* input pass */}
          <label htmlFor="password">Password :</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" placeholder="Enter Your Email" id="password" name="password" className="focus:outline-[#0aad0a] bg-gray-50 border mb-[12px] border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
          {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            <span className="font-medium">Error!</span> {formik.errors.password}
          </div> : ""}

          <p>
            <Link to={"/forgetPassword"} className=" hover:underline hover:text-[#0aad0a] duration-300 transition-all text-lg font-semibold">Forget Password </Link> And if you don't have an account <Link to={"/register"} className=" hover:underline hover:text-[#0aad0a] duration-300 transition-all text-lg font-semibold">Register Now !</Link>
          </p>

          <div className="flex justify-end">
            <button type="submit" className="bg-[#0aad0a] text-white py-2 px-4 rounded-2xl cursor-pointer disabled:opacity-65 disabled:cursor-not-allowed" disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}>
              {formik.isSubmitting ? <i className="fa-solid fa-spin fa-spinner text-white"></i> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>

  )
}

export default Login
