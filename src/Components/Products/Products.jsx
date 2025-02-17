import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { CartContext } from "../../Context/CartContext"
import toast from "react-hot-toast"
import { Bars } from "react-loader-spinner"
import { WishListContext } from "../../Context/WishListContext"
import { Link } from "react-router-dom"
import ReactPaginate from "react-paginate"


const Products = () => {

    const [subProduct, setSubProduct] = useState([])
    const [loading, setLoading] = useState(null)
    const [loaderWishList, setLoaderWishList] = useState(null)
    const [loader, setLoader] = useState(false)
    const [currentItem, setCurrentItem] = useState({})
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState('ratingsAverage')
    console.log(currentItem , 'dasdaskjdhakj');
    

    const handleGetAllProducts = async () => {
        try {
            setLoader(true)
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products' , {
                params : {
                    limit : 20 ,
                    page,
                    sort
                }
            })
            setSubProduct(data.data)
            setCurrentItem(data)
        } catch (error) {
            console.log(error);

        } finally {
            setLoader(false)
        }
    }

    const { addProductToCart } = useContext(CartContext)

    async function getDataProduct(id) {
        try {
            setLoading(id)
            const data = await addProductToCart(id)
            if (data.status == 'success') {
                toast.success(data.message)
                setLoading(null)
                console.log(data);

            }
        } catch (error) {
            toast.error('Something went wrong')
            return error
        } finally {
            setLoading(null)
        }
    }

    const { addToWishListContext, removeFromWishListContext, wishList } = useContext(WishListContext)
    const handleWishList = async (id) => {
        const inWishList = wishList.some((item) => item.id === id);
        try {
            setLoaderWishList(id)
            const data = inWishList ? await removeFromWishListContext(id) : await addToWishListContext(id);
            toast.success(data.message);
        } catch (error) {
            console.error(error);
        } finally {
            setLoaderWishList(null)
        }
    };


    const handleSort = (e)=>{
        setSort(e.target.value)
    }
    

    useEffect(() => {
        handleGetAllProducts()
    }, [page , sort])

    if (loader) {
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
        <div className="product py-10 ">
            <div className="container md:w-[80%] mx-auto py-10">

                <div className="flex flex-wrap justify-center gap-4 items-center">
                    <label htmlFor="sort"><i className="fa-solid fa-filter text-[#0aad0a] fa-xl"></i></label>
                    <select defaultValue={sort} className="py-4 border-2 px-12 rounded-md border-[#0aad0aa6]  focus:shadow-md focus:outline-[#0aad0a]" onChange={handleSort} id="sort">
                        <option value="-title">A - Z</option>
                        <option value="-price">High - Low</option>
                        <option value="title">Z - A</option>
                        <option value="price">Low - High</option>
                        <option value="ratingsAverage">Top Rated</option>
                    </select>
                </div>

                <div className="flex flex-wrap gap-3 p-3">

                    {/* MAP */}
                    {subProduct.map(item => {
                        return <div key={item.id} className=" md:w-1/5 rounded-lg shadow-lg mx-auto transition-all duration-[0.3s] hover:scale-[1.01] hover:translate-y-[-1%] hover:shadow-2xl p-2">

                            <Link to={`/product-details/${item.id}`}>
                                <figure>
                                    <img src={item.imageCover} className="rounded-t-lg" alt="product image" />
                                </figure>
                                <div className="py-2 px-2">
                                    <h5 className="text-1xl font-bold  tracking-tight text-[#0aad0a]">{item.title.split(' ', 2).join(' ')}</h5>
                                    <span className="text-xs font-semibold">{item.description.split(' ', 10).join(' ')}</span>
                                </div>
                                <div className="flex justify-between items-center py-1 px-3">
                                    <span className="text-gray-500">{item.price} EGP</span>
                                    <span><i className="fa-solid fa-star text-yellow-400"></i> {item.ratingsAverage} </span>
                                </div>
                            </Link>

                            <div className="my-2">
                                <button onClick={() => getDataProduct(item.id)} className="w-2/3 font-bolder bg-[#0aad0a] rounded-xl text-white py-2 cursor-pointer disabled:opacity-65" disabled={loading == item.id}>{loading == item.id ? <i className='fa-solid fa-spin fa-spinner fa-lg'></i> : "Add to cart"} </button>
                                {loaderWishList == item.id ? <i className="fa-spin fa-spinner fa-solid text-center w-1/3 fa-lg text-red-700"></i> : <i onClick={() => handleWishList(item.id)} className={`fa-heart fa-${wishList.some(wishItem => wishItem.id === item.id) ? 'solid' : 'regular'} fa-lg text-red-700 w-1/3 text-center`}></i>}

                            </div>

                        </div>
                    })}


                </div>

            </div>

            <ReactPaginate
                previousLabel={<i className="fa-solid fa-angle-left"></i>}
                nextLabel={<i className="fa-solid fa-angle-right"></i>}
                className="flex flex-wrap justify-center gap-2 cursor-pointer"
                activeClassName="text-green-700 border-2 border-gray-300 px-0.5 shadow-md"
                pageCount={currentItem?.metadata?.numberOfPages}
                onPageChange={()=>{setPage(page + 1 )}}
                forcePage={page - 1}

            />

        </div>
    )
}

export default Products
