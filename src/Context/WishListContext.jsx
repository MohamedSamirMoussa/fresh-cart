import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const WishListContext = createContext();

const WishListContextProvider = ({ children }) => {
    const [wishList, setWishList] = useState([])
    // const [price, setPrice] = useState(0)
    const [wishListNum, setWishListNum] = useState(0)
    const { token } = useContext(AuthContext)


    const updateLocalStorage = (data) => {
        localStorage.setItem("wishlist", JSON.stringify(data));
        setWishList(data);
        setWishListNum(data.length);
    };

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
            getAllDataContext()
            updateLocalStorage(data.data)
            return data
        } catch (error) {
            console.log(error, 'From addToWishListContext');

        }
    }

    // Remove 
    const removeFromWishListContext = async (id) => {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers: { token } })
            getAllDataContext()
            updateLocalStorage(data.data)

            return data
        } catch (error) {
            console.log(error, 'from remove wishist context');

        }
    }

    // Get all data
    const getAllDataContext = async () => {
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers: { token } })
            updateLocalStorage(data.data)
            return data
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        const storage = localStorage.getItem('wishlist')
        if (token) {
            if (storage) {
                const dataFromLocal = JSON.parse(storage)
                setWishList(dataFromLocal)
                setWishListNum(dataFromLocal.length)

            } else {
                getAllDataContext()
            }
        }
    }, [token])

    return (
        <WishListContext.Provider value={{ wishList, addToWishListContext, wishListNum, removeFromWishListContext, getAllDataContext, setWishList }} >
            {children}
        </WishListContext.Provider>
    );
};

export default WishListContextProvider;
