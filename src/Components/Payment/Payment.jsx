import axios from "axios";
import { useFormik } from "formik"
import { useContext, useState } from "react";
import * as Yup from 'yup';
import { CartContext } from './../../Context/CartContext';
import { AuthContext } from './../../Context/AuthContext';
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Payment = () => {
    // Import data from context
    const { cardId, setNumOfItem, setTotalPrice, setProducts } = useContext(CartContext)
    const { token } = useContext(AuthContext)
    // Check on radios if is cash or online 
    const [paymentType, setPaymentType] = useState("cash")
    // useNavigate to send user on another page
    const navigate = useNavigate()
    // Values from back-end
    const initialValues = {
        shippingAddress: {
            details: "",
            phone: "",
            city: ""
        }
    }
    // Validation
    const validationSchema = Yup.object().shape({
        shippingAddress: Yup.object().shape({
            details: Yup.string().required("Details are required").min(3, "At least input 3 characters"),
            city: Yup.string().required("City is required").min(3, "At least input 3 characters"),
            phone: Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/, "Phone must be an Egyptian number"),
        })
    })
    // Send data and calling APIs
    const handleOrder = async (values, { setSubmitting, resetForm }) => {
        try {
            // Handle submitting from FORMIK
            setSubmitting(true)
            // Cash
            if (paymentType === 'cash') {
                const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cardId}`, values, {
                    headers: {
                        token: token
                    }
                })
                // Return to default values
                setProducts([])
                setTotalPrice(0)
                setNumOfItem(0)
                // Clear Fields
                resetForm()
                navigate("/allorders")
                toast.success(data.status)
                return data
            } else {
                // Online
                const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}`, values,
                    {
                        headers: {
                            token: token
                        },
                        params: {
                            // My URL
                            url: "https://fresh-cart-steel-pi.vercel.app/#"
                        }
                    }
                )
                // Open a online page payment
                window.open(data.session.url, "_self")
            }
        } catch (error) {
            toast.error(error.response?.data?.message)
        } finally {
            setSubmitting(false)
        }
    }
    const formik = useFormik({
        initialValues,
        onSubmit: handleOrder,
        validationSchema,
    })
    return (
        <div className="md:w-[80%] mx-auto mt-10 py-10">
            <div className="p-5">
            <h1 className="text-5xl my-5 uppercase text-[#0aad0a] font-bold">Payment:</h1>
                <form onSubmit={formik.handleSubmit}>
                    {/* City Field */}
                    <label htmlFor="city">City :</label>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.shippingAddress.city} type="text" id="city" name="shippingAddress.city" className="focus:outline-[#0aad0a] bg-gray-50 border mb-[12px] border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                    {formik.errors.shippingAddress?.city && formik.touched.shippingAddress?.city && (
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
                            <span className="font-medium">Error!</span> {formik.errors.shippingAddress.city}
                        </div>
                    )}
                    {/* Phone Field */}
                    <label htmlFor="phone">Phone :</label>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.shippingAddress.phone} type="tel" id="phone" name="shippingAddress.phone" className="focus:outline-[#0aad0a] bg-gray-50 border mb-[12px] border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                    {formik.errors.shippingAddress?.phone && formik.touched.shippingAddress?.phone && (
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
                            <span className="font-medium">Error!</span> {formik.errors.shippingAddress.phone}
                        </div>
                    )}
                    {/* Details Field */}
                    <label htmlFor="details">Details :</label>
                    <textarea onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.shippingAddress.details} id="details" name="shippingAddress.details" className="focus:outline-[#0aad0a] bg-gray-50 border mb-[12px] border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                    {formik.errors.shippingAddress?.details && formik.touched.shippingAddress?.details && (
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
                            <span className="font-medium">Error!</span> {formik.errors.shippingAddress.details}
                        </div>
                    )}
                    {/* Radio */}
                    <div className="flex items-center my-2">
                        <input disabled={!formik.isValid || !formik.dirty || formik.isSubmitting} value={"cash"} onChange={() => setPaymentType('cash')} checked={paymentType === 'cash'} id="Cash" type="radio" name="colored-radio" className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500  disabled:opacity-65 disabled:cursor-not-allowed" />
                        <label htmlFor="Cash" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cash</label>
                    </div>
                    <div className="flex items-center my-2">
                        <input disabled={!formik.isValid || !formik.dirty || formik.isSubmitting} value={"online"} onChange={() => setPaymentType('online')} checked={paymentType === 'online'} id="Online" type="radio" name="colored-radio" className="w-4 h-4 text-[#0aad0a] bg-gray-100 border-gray-300 disabled:opacity-65 disabled:cursor-not-allowed" />
                        <label htmlFor="Online" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Online</label>
                    </div>
                    {/* Buttons */}
                    <div className="mb-4">
                        <button type="submit" className="bg-[#0aad0a] text-white py-2 px-4 rounded-2xl cursor-pointer disabled:opacity-65 disabled:cursor-not-allowed" disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}>
                            {formik.isSubmitting ? <i className="fa-solid fa-spin fa-spinner text-white fa-lg"></i> : paymentType === 'cash' ? 'Pay with cash' : 'Pay Online'}
                        </button>
                        {/* Cancel order and return to cart page */}
                        <Link to={"/cart"} className="mx-2 bg-red-700 text-white py-2 px-4 rounded-2xl">Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Payment