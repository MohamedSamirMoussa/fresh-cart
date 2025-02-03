import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from './AuthContext';
import toast from "react-hot-toast";
export const CartContext = createContext()

const CartContextProvider = ({ children }) => {

    const [products, setProducts] = useState([])
    const [numOfItem, setNumOfItem] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [loading, setLoading] = useState(false)
    const [loadingPanal, setLoadingPanal] = useState(false)
    const [cardId, setCardId] = useState([])
    const { token } = useContext(AuthContext)

    // Add Product
    async function addProductToCart(id) {
        try {
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",
                { productId: id },
                { headers: { token: token } }
            );


            await saveUserCartsData()

            return data

        } catch (error) {
            console.log(error, "error from context");
            toast.error("Something went wrong")
        }
    }
    // Update on Product
    async function updataProductToCart(id, count) {
        try {
            setLoadingPanal(true)
            const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                { count },
                { headers: { token: token } }
            );


            setProducts(data.data.products)
            setTotalPrice(data.data.totalCartPrice)
            setNumOfItem(data.numOfCartItems)
            toast.success(data.status)
            setLoadingPanal(false)
            return data

        } catch (error) {
            console.log(error, "error from context");
            setLoadingPanal(false)
            toast.error("Something went wrong")

        }
    }
    // Remove one product
    async function deleteProductToCart(id) {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                { headers: { token: token } }
            );


            setProducts(data.data.products)
            setTotalPrice(data.data.totalCartPrice)
            setNumOfItem(data.numOfCartItems)
            toast.success(data.status)
            return data

        } catch (error) {
            console.log(error, "error from context");
            toast.error("Something went wrong")

        }
    }
    // Clear Cart
    async function clearProductToCart() {
        try {
            setLoading(true)

            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
                { headers: { token: token } }
            );

            setProducts([])
            setTotalPrice(0)
            setNumOfItem(0)
            toast.success(data.message)
            setLoading(false)
            return data

        } catch (error) {
            console.log(error, "error from context");
            setLoading(false)
            toast.error("Something went wrong")

        }
    }
    // Save the data after update or delete or clear
    async function saveUserCartsData() {
        try {
            setLoading(true)
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart",
                {
                    headers: {
                        token: token
                    }
                }
            )

            setProducts(data.data.products)
            setTotalPrice(data.data.totalCartPrice)
            setNumOfItem(data.numOfCartItems)
            setLoading(false)
            setCardId(data?.cartId);
            return data
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    // Handle Payment

    useEffect(() => {
        if (token) {
            saveUserCartsData()
        }
    }, [token])

    return (
        <CartContext.Provider value={
            { setNumOfItem, setTotalPrice, setProducts, cardId, addProductToCart, products, numOfItem, totalPrice, saveUserCartsData, loading, setLoading, updataProductToCart, deleteProductToCart, clearProductToCart, loadingPanal }
        }>
            {children}

        </CartContext.Provider>
    )
}

export default CartContextProvider