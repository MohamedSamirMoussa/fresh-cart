import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from 'react-query';
import { Bars } from 'react-loader-spinner';
import { CartContext } from '../../Context/CartContext';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';

const ProductDetails = () => {

    const { id } = useParams()

    const [loading, setLoading] = useState(false)

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

    const getProductsDetails = async () => {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }

    const { data, isLoading } = useQuery(`product-detail${id}`, getProductsDetails)


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
            <div className="md:w-[80%] mx-auto py-10 mt-10">
                <div className="flex flex-wrap justify-center items-center">
                    <div className="md:w-1/3 p-5">
                        <img src={data.data.data.imageCover} className='w-full' alt="" />
                    </div>
                    <div className="md:w-2/3 p-5">
                        <h1 className='mb-3 text-2xl capitalize font-semibold'>
                            {data.data.data.slug}
                        </h1>
                        <p className='mb-3 text-md text-gray-900'>{data.data.data.description}</p>
                        <span className='font-bold'>{data.data.data.category.name}</span>
                        <div className="flex justify-between items-center my-3">
                            <span>{data.data.data.price} EGP</span>
                            <span><i className="fa-solid fa-star text-yellow-400"></i> {data.data.data.ratingsAverage}</span>
                        </div>
                        <div className="text-center">
                            {loading ?
                                <button onClick={() => getData(id)} className="w-full font-bolder bg-[#0aad0a] rounded-xl text-white py-2 cursor-pointer disabled:opacity-65" disabled><i className='fa-solid fa-spin fa-spinner fa-lg'></i> </button>
                                :
                                <button onClick={() => getData(id)} className="w-full font-bolder bg-[#0aad0a] rounded-xl text-white py-2 cursor-pointer"><i className='fa-solid fa-plus'></i> Add to cart</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetails
