import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const WishListContext = createContext();

const WishListContextProvider = ({ children }) => {
    const [wishList, setWishList] = useState([])
    // const [price, setPrice] = useState(0)
    const [wishListNum, setWishListNum] = useState(0)
    const { token } = useContext(AuthContext)

    // Add
    const addToWishListContext = async (id) => {
        try {
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
                {
                    productId: id
                }, {
                headers: {
                    token
                }
            }
            )
            setWishList(data.data)
            setWishListNum(data.data.length)
            console.log(data);
            return data
        } catch (error) {
            console.log(error, 'From addToWishListContext');

        }
    }

    // Remove 
    const removeFromWishListContext = async (id) => {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers: { token } })
            setWishList(data.data)
            setWishListNum(data.data.length)
            console.log(data);
            return data
        } catch (error) {
            console.log(error, 'from remove wishist context');

        }
    }

    // Get all data
    const getAllDataContext = async () => {
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers: { token } })
            setWishList(data.data)
            setWishListNum(data.data.length)
            console.log(data);
            return data
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        if (token) {
            getAllDataContext()
        }
    }, [token])

    return (
        <WishListContext.Provider value={{ wishList, addToWishListContext, wishListNum, removeFromWishListContext }} >
            {children}
        </WishListContext.Provider>
    );
};

export default WishListContextProvider;
