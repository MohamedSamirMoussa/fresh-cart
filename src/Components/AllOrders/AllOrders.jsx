import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useQuery } from "react-query";
import { Bars } from "react-loader-spinner";

const AllOrders = () => {
  const { id } = jwtDecode(localStorage.getItem("tkn"));

  const getUserOrder = async () => {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
  };

  const { data, isLoading } = useQuery("getUserOrder", getUserOrder);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center fixed inset-0 bg-gray-50 z-50">
        <Bars height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" />
      </div>
    );
  }

  return (
    <div className="mx-auto mt-12 py-12">
      <div className="bg-white shadow-lg rounded-3xl p-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10">Your Orders :</h1>
        {data?.data.map((order, idx) => (
          <div key={idx} className="border border-gray-300 rounded-2xl p-6 mb-10 shadow-md bg-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-1">
                <h2 className="text-2xl font-semibold text-gray-800">Order ID: {order.id}</h2>
                <p className="text-xl text-green-700 font-bold">Total Price: ${order.totalOrderPrice}</p>
                <p className="text-lg text-gray-700">Payment Method: {order.paymentMethodType}</p>
                <p className="text-lg text-gray-700">Shipping Address: {order.shippingAddress.city}, {order.shippingAddress.details}</p>
                <p className={`text-lg font-bold mt-3 ${order.isDelivered ? "text-green-700" : "text-yellow-600"}`}>
                  Status: {order.isDelivered ? "Delivered" : "Processing"}
                </p>
              </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {order.cartItems?.map((item, index) => (
                    <div key={index} className="p-4 text-center hover:shadow-xl hover:translate-y-[-1%] border rounded-xl shadow-md duration-300 transition-all bg-white">
                      <img src={item.product.imageCover} alt={item.product.title} className="w-full h-32 object-cover rounded-lg" />
                      <h3 className="text-md font-semibold mt-3 text-gray-900">{item.product.title}</h3>
                      <p className="text-sm text-gray-700">Qty: {item.count}</p>
                      <p className="text-sm text-gray-700">Price: ${item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default AllOrders;