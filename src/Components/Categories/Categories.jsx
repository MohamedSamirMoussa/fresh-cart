import axios from 'axios'
import './Categories.css'
import { useQuery } from 'react-query'
import { Bars } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
const Categories = () => {
    const getAllCategories = async () => {
        return await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }

    const { data, isLoading } = useQuery('categories', getAllCategories)


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
        <div className="cat py-10 mt-10 relative">
            <div className="container py-10 w-[80%] mx-auto">
                <div className="inner flex flex-wrap items-center gap-4 justify-center">
                    {data?.data.data.map((category, index) => {
                        return <div key={index} className="card md:w-1/4 border-1 border-gray-300 duration-300">
                            <Link to={`/category-details/${category._id}`}>
                                <div className="body">
                                    <figure>
                                        <img src={category.image} className='w-full block h-[300px]' alt="" />
                                    </figure>
                                </div>
                                <div className="footer text-center py-3 border-t-1 border-gray-300">
                                    <h2 className='text-2xl font-bold'>{category.name}</h2>
                                </div>
                            </Link>
                        </div>

                    })}
                </div>
            </div>




            <div>
            </div>

        </div>
    )
}

export default Categories