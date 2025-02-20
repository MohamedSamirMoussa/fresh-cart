import { useContext, useState } from "react";
import { WishListContext } from "../../Context/WishListContext";
import toast from "react-hot-toast";
import { Bars } from "react-loader-spinner";

const Wish = () => {
    const { removeFromWishListContext, wishList } = useContext(WishListContext);
    const [loader, setLoading] = useState(null);

    // Handle Remove Item
    const handleRemove = async (id) => {
        setLoading(id);
        try {
            const dataFromRemoveContext = await removeFromWishListContext(id);
            toast.success(dataFromRemoveContext.message); // Notify user of success
        } catch (error) {
            console.error(error);
            toast.error("Failed to remove item from wishlist"); // Notify user of error
        } finally {
            setLoading(null);
        }
    };

    if (loader) {
        return (
            <div className="h-screen flex justify-center items-center fixed top-0 start-0 end-0 bottom-0 bg-[#f0f3f2] z-50">
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
        );
    }

    return (
        <div className="wish mt-10 py-7">
            <div className="container w-[80%] mx-auto py-7">
                <h1 className="text-4xl font-bold mb-5">Wish List:</h1>

                <div className="p-5 w-full bg-slate-200 rounded-lg">
                    {wishList.length === 0 ? (
                        <p className="text-center text-gray-600">Your wishlist is empty.</p>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                            {wishList.map((items, index) => (
                                <div key={index} className="card bg-white p-4 shadow-md rounded-lg">
                                    <figure>
                                        <img
                                            src={items.imageCover}
                                            alt={items.title?.split(' ').splice(0, 2).join(' ')}
                                            className="w-full rounded-t-lg"
                                        />
                                        <figcaption className="text-gray-500 mt-2">
                                            {items.description?.split(' ').splice(0, 15).join(' ')}
                                        </figcaption>
                                    </figure>
                                    <div className="txt mt-3">
                                        <h3 className="text-lg font-bold">
                                            {items.title}
                                        </h3>
                                        <p className="text-sm text-gray-600">Category: {items.category?.name}</p>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-green-600 font-semibold">{items.price} EGP</span>
                                            <span className="text-yellow-500 flex items-center">
                                                <i className="fa-solid fa-star mr-1"></i>
                                                {items.ratingsAverage}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => handleRemove(items.id)}
                                            className="mt-3 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all disabled:opacity-50"
                                            disabled={loader === items.id}
                                        >
                                            {loader === items.id ? (
                                                <i className="fa-solid fa-spinner fa-spin"></i>
                                            ) : (
                                                "Remove"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Wish;