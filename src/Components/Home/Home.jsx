import axios from "axios"
import { Bars } from "react-loader-spinner";
import { useQuery } from "react-query";
import HomeSlider from "../HomeSlider/HomeSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import { Link } from 'react-router-dom';
import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";


const Home = () => {

    const [loading, setLoading] = useState(false)

    async function getAllProducts() {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/products")
    }

    const { data, isLoading } = useQuery("products", getAllProducts)

    const { addProductToCart } = useContext(CartContext)

    async function getData(id) {
        setLoading(true)
        const data = await addProductToCart(id)
        console.log(data);

        if (data.status == 'success') {
            toast.success(data.message)
            setLoading(false)
        } else {
            toast.error('Something went wrong')
            setLoading(false)
        }

    }


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
        <>
            <div className="home py-10 ">
                <div className="container md:w-[80%] mx-auto py-10">

                    <div className="p-3">
                        <HomeSlider />
                    </div>

                    <div>
                        <h3 className="text-3xl text-bold mb-4 capitalize">
                            shope popular categories
                        </h3>
                        <CategorySlider />
                    </div>

                    <div className="flex flex-wrap gap-3 p-3">
                        {data?.data.data.map((item, idx) => {
                            return <div key={idx} className="lg:w-1/5 md:w-1/4 xl:w-1/9 rounded-lg shadow-lg mx-auto transition-all duration-[0.3s] hover:scale-[1.01] hover:translate-y-[-1%] hover:shadow-2xl p-2">
                                <Link to={`/product-details/${item.id}`}>
                                    <figure>
                                        <img className="rounded-t-lg" src={item.imageCover} alt="product image" />
                                    </figure>
                                    <div className="py-3 px-3">
                                        <h5 className="text-1xl font-bold  tracking-tight text-[#0aad0a]">{item.category.name}</h5>
                                        <span className="text-xs font-semibold">{item.title.split(" ").splice(0, 2).join(" ")}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1 px-3">
                                        <span className="text-gray-500">{item.price} EGP</span>
                                        <span><i className="fa-solid fa-star text-yellow-400"></i>{item.ratingsAverage} </span>
                                    </div>
                                </Link>
                                <div className="text-center">
                                    {loading ?
                                        <button onClick={() => getData(item.id)} className="w-full font-bolder bg-[#0aad0a] rounded-xl text-white py-2 cursor-pointer disabled:opacity-65" disabled><i className='fa-solid fa-spin fa-spinner fa-lg'></i> </button>
                                        :
                                        <button onClick={() => getData(item.id)} className="w-full font-bolder bg-[#0aad0a] rounded-xl text-white py-2 cursor-pointer"><i className='fa-solid fa-plus'></i> Add to cart</button>
                                    }                                </div>
                            </div>
                        })}

                    </div>

                </div>
            </div>
        </>
    )
}

export default Home
