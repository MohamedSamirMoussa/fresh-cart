import { jwtDecode } from "jwt-decode"
import axios from "axios"
import { useQuery } from "react-query"
import { Bars } from "react-loader-spinner";

const AllOrders = () => {

    const { id } = jwtDecode(localStorage.getItem("tkn"))


    const getUserOrder = async () => {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
    }

    const { data, isLoading } = useQuery('getUserOrder', getUserOrder)

    console.log(data);
    if (isLoading) {
        return <div className="h-screen flex justify-center items-center fixed top-0 start-0 end-0 bottom-0 bg-[#f0f3f2] z-50">
            <Bars
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />

        </div>
    }
    return (
        <div className="w-[80%] mx-auto mt-10 py-10">
            <div className="mt-10 bg-slate-50 p-8">
            <h1 className="text-5xl font-bold my-5 ">Your Orders :</h1>
                {data?.data.map((order, idx) => (
                    <div key={idx} className="flex flex-wrap justify-center items-center border-b-2 border-b-gray-300">
                        {/* Display Cart Items */}
                        {order.cartItems?.map((item, index) => (
                            <div key={index} className="md:w-1/4 lg:w-1/6 p-3 text-center">
                                <img src={item.product.imageCover} alt={item.product.title} className="w-full h-auto" />
                                <h3 className="text-lg font-semibold mt-2">{item.product.title}</h3>
                                <p className="text-sm text-gray-600">Quantity: {item.count}</p>
                                <p className="text-sm text-gray-600">Price: ${item.price}</p>
                            </div>
                        ))}

                        {/* Order Details */}
                        <div className="md:w-2/4 lg:w-4/6 text-center p-3">
                            <h2 className="text-3xl font-semibold my-2">Order ID: {order.id}</h2>
                            <p className="text-xl font-semibold text-[#0aad0a] my-2">Total Price: ${order.totalOrderPrice}</p>
                            <p className="text-lg text-gray-600">Payment Method: {order.paymentMethodType}</p>
                            <p className="text-lg text-gray-600">Shipping Address: {order.shippingAddress.city}, {order.shippingAddress.details}</p>
                        </div>

                        {/* Order Status */}
                        <div className="md:w-1/4 lg:w-1/6 p-3 flex flex-wrap items-center justify-center">
                            <h2 className="text-3xl font-semibold my-2 px-2">Status:</h2>
                            <span className="text-xl font-semibold text-[#0aad0a] my-2 px-2">{order.isDelivered ? "Delivered" : "Processing"}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllOrders
