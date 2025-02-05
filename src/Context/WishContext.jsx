import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"

export const WishContext = createContext()

const WishContextProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([])
    const [wishlistNum, setWishlistNum] = useState(0)

    const { token } = useContext(AuthContext)



    const addToWishListContext = async (id) => {
        try {
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",
                {
                    productId: id
                }, {
                headers: {
                    token: token
                }
            }
            )

            setWishlist((prev) => [...prev, data.data]);
            setWishlistNum((prev) => prev + 1);

            return (data)

        } catch (error) {
            console.log(error);

        }
    }

    const removeFromWishListContext = async (id) => {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
                headers: { token },
            });

            setWishlist((prev) => prev.filter((item) => item.id !== id));
            setWishlistNum((prev) => prev > 0 ? prev - 1 : 0);
            return data;
        } catch (error) {
            console.error(error);
        }
    }



    const saveDataWishList = async () => {
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
                headers: {
                    token: token
                }
            })

            setWishlistNum(data.count)
            setWishlist(data.data)
            return data
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        if (token) {
            saveDataWishList()
        }
    }, [token])

    return (

        <WishContext.Provider value={
            { addToWishListContext, removeFromWishListContext, saveDataWishList , wishlist, wishlistNum }
        }>
            {children}
        </WishContext.Provider>

    )
}

export default WishContextProvider