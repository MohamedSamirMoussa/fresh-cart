import axios from "axios";
import { Bars } from "react-loader-spinner";
import { useQuery, useQueryClient } from "react-query";
import HomeSlider from "../HomeSlider/HomeSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishContext } from "../../Context/WishContext";

const Home = () => {
    const [loading, setLoading] = useState(null);
    const [loadingWish, setLoadingWish] = useState(null);
    const queryClient = useQueryClient();

    const { addProductToCart } = useContext(CartContext);
    const { addToWishListContext, removeFromWishListContext, wishlist } = useContext(WishContext);

    const getAllProducts = async () => {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    };

    const { data, isLoading } = useQuery("products", getAllProducts);

    const handleAddToCart = async (id) => {
        try {
            setLoading(id);
            const response = await addProductToCart(id);
            if (response.status === "success") {
                toast.success(response.message);
                queryClient.invalidateQueries("products");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(null);
        }
    };

    const handleWishList = async (id) => {
        try {
            setLoadingWish(id);
            if (wishlist.some((item) => item.id === id)) {
                const response = await removeFromWishListContext(id);
                toast.success(response.message);
            } else {
                const response = await addToWishListContext(id);
                toast.success(response.message);
            }
            queryClient.invalidateQueries("products");
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoadingWish(null);
        }
    };

    if (isLoading) {
        return (
            <div className="h-screen flex justify-center items-center fixed top-0 start-0 end-0 bottom-0 bg-[#f0f3f2] z-50">
                <Bars height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" visible={true} />
            </div>
        );
    }

    return (
        <>
            <div className="home py-10">
                <div className="container md:w-[80%] mx-auto py-10">
                    <div className="p-3">
                        <HomeSlider />
                    </div>

                    <div>
                        <h3 className="text-3xl font-bold mb-4 capitalize">Shop popular categories</h3>
                        <CategorySlider />
                    </div>

                    <div className="flex flex-wrap gap-3 p-3">
                        {data?.data.data.map((item) => (
                            <div key={item.id} className="lg:w-1/5 md:w-1/4 xl:w-1/9 rounded-lg shadow-lg mx-auto transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl p-2">
                                <Link to={`/product-details/${item.id}`}>
                                    <figure>
                                        <img className="rounded-t-lg" src={item.imageCover} alt="product image" />
                                    </figure>
                                    <div className="py-3 px-3">
                                        <h5 className="text-xl font-bold text-[#0aad0a]">{item.category.name}</h5>
                                        <span className="text-xs font-semibold">{item.title.split(" ").slice(0, 2).join(" ")}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1 px-3">
                                        <span className="text-gray-500">{item.price} EGP</span>
                                        <span>
                                            <i className="fa-solid fa-star text-yellow-400"></i> {item.ratingsAverage}
                                        </span>
                                    </div>
                                </Link>
                                <div className="flex flex-wrap justify-between items-center">
                                    <button
                                        onClick={() => handleAddToCart(item.id)}
                                        className="p-3 font-bold bg-[#0aad0a] rounded-xl text-white py-2 cursor-pointer disabled:opacity-65"
                                        disabled={loading === item.id}
                                    >
                                        {loading === item.id ? <i className="fa-solid fa-spinner fa-spin fa-lg"></i> : "Add to cart"}
                                    </button>

                                    <button
                                        onClick={() => handleWishList(item.id)}
                                        disabled={loadingWish === item.id}
                                        className="cursor-pointer"
                                        aria-label={wishlist.some((data) => data.id === item.id) ? "Remove from wishlist" : "Add to wishlist"}
                                    >
                                        {loadingWish === item.id ? (
                                            <i className="fa-solid fa-spinner fa-spin fa-lg"></i>
                                        ) : wishlist.some((data) => data.id === item.id) ? (
                                            <i className="text-red-700 fa-solid fa-heart fa-lg"></i>
                                        ) : (
                                            <i className="hover:text-red-700 fa-regular fa-heart fa-lg"></i>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
