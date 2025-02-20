import axios from "axios"
import { Bars } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom"
const CategoryDetails = () => {
    const { id } = useParams()
    const handleCategoryDetails = async () => {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
    }
    const { data, isLoading } = useQuery(`category-details${id}`, handleCategoryDetails)
    const x = data?.data.data
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
        <div className="py-10 mt-10 relative">
            <Link to={'/category'} className="absolute top-15 z-20 end-10 border-1 border-gray-300 rounded-2xl w-[40px] h-[40px] flex justify-center items-center cursor-pointer">
                <i className="fa-solid fa-xl fa-close"></i>
            </Link>
            <div className="container w-[80%] mx-auto">
                <h1 className="text-3xl py-7">Category Details :</h1>
                <div className="inner flex justify-center">
                    <div className="md:w-1/3 p-5 shadow-xl border-1 border-gray-300 rounded-2xl">
                        <img src={x?.image} className='w-full h-[400px]' alt="" />
                        <figcaption className="text-center py-1">
                            <p className="font-bold text-2xl">{x?.name}</p>
                        </figcaption>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CategoryDetails