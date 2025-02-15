import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Error from "./Components/Error/Error.jsx";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./Context/AuthContext.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./Components/ProductDetails/ProductDetails.jsx";
import CartContextProvider from "./Context/CartContext.jsx";
import Payment from "./Components/Payment/Payment.jsx";
import AllOrders from "./Components/AllOrders/AllOrders.jsx";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword.jsx";
import ResetPassword from "./Components/ResetPassword/ResetPassword.jsx";
import NewPassword from "./Components/newPassword/NewPassword.jsx";
import ProtectedAuthRoute from "./Components/ProtectedAuthRoute/ProtectedAuthRoute.jsx";

const App = () => {

  const client = new QueryClient
  const router = createHashRouter([
    {
      path: "", element: <Layout />, children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: "/cart", element: <ProtectedRoute><Cart /> </ProtectedRoute> },
        { path: "/payment", element: <ProtectedRoute><Payment /></ProtectedRoute> },
        { path: "/allorders", element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
        { path: "/login", element: <ProtectedAuthRoute><Login /></ProtectedAuthRoute> },
        { path: "/forgetPassword", element: <ProtectedAuthRoute><ForgetPassword /></ProtectedAuthRoute> },
        { path: "/ResetPassword", element: <ProtectedAuthRoute><ResetPassword /></ProtectedAuthRoute> },
        { path: "/newPassword", element: <ProtectedAuthRoute><NewPassword /></ProtectedAuthRoute> },
        { path: "/register", element: <ProtectedAuthRoute><Register /></ProtectedAuthRoute> },
        { path: "/product-details/:id", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: "*", element: <Error /> },
      ],
    },
  ]);
  return (

    <QueryClientProvider client={client}>
      <AuthContextProvider>
          <CartContextProvider>
            <Toaster position="top-right" reverseOrder={false} />
            <RouterProvider router={router} />
          </CartContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default App;
